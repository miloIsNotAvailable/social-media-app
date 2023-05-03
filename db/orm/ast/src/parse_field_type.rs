pub mod parse {

    use crate::schema::{ Pairs, Rule, Pair };
    use crate::base_type::{ parse_base_type, BaseType, BaseTypes, Optional, List, Types };
    use crate::expression::{ parse_arg_list, Arguments, Argument };
    use std::fmt;

    #[derive(Debug)]
    pub enum FieldCompile<'a> {
        DISPLAY_FIELD( &'a String, &'a Vec<AttrType<'a>>, &'a BaseTypes )
    }

    impl fmt::Display for FieldCompile<'_> {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            match self {
                Self::DISPLAY_FIELD( name, attrs, base ) => {

                    if attrs.is_empty(){

                        return match ( &name, &base.sql_type ) {
                            ( name, Types::TABLE( val ) ) => write!( f, "{}", format!( "" ) ),
                            ( name, base ) => write!( f, "{} {}", format!( "{name}" ), format!( "{base}" ) ),        
                        }
                    }
                    
                    let [ ref attributes, .. ] = attrs[..] else { todo!() };

                    match ( &name, &attributes.path, &base.sql_type ) {
                        // if varchar remove TEXT type
                        ( 
                            name, 
                            Attr::VAR_CHAR( val ), 
                            base 
                        ) => write!( f, "{} {}", name, format!( "{attributes}" ) ),
                        // if table constraint leave only the constraint
                        // that'll remove the Table[] type from schema
                        // since it has not attributes
                        ( name, attr, Types::TABLE( val ) ) => write!( f, "{}", format!( "{attr}" ) ),
                        ( name, attr, base ) => write!( f, "{} {} {}", name, format!( "{base}" ), format!( "{attr}" ) ),
                    }
                }
            }
        }
    }

    #[derive(Debug)]
    pub struct FieldType<'a> {
        pub name: String,
        pub field: BaseTypes,
        pub attributes: Vec<AttrType<'a>>
    }

    impl fmt::Display for FieldType<'_> {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            let mut opt: String = "".to_string();
            let mut formatted_attrs: Vec<String> = vec![];

            let display = FieldCompile::DISPLAY_FIELD( &self.name, &self.attributes, &self.field );
            formatted_attrs.push( format!( "{display}" ) );

            let base_type_formatted = format!( "{}", self.field);

            if base_type_formatted.is_empty() { return write!( f, "" ) };

            write!(f, "{}", 
                // display
                formatted_attrs.join( " " ), 
            )
        }
    }

    #[derive(Debug)]
    pub struct FieldAttrType {
        pub path: String,
        pub arguments_list: Arguments
    }

    // converting to enum, 
    // ill add a way to convert to both 
    // and from sql using those
    #[derive(Debug)]
    pub enum Attr<'a> {
        PRIMARY_KEY,
        DEFAULT( String ),
        // this gets mapped to Attr::DEFAULT( "now()" )
        UPDATED_AT,
        UNIQUE,
        VAR_CHAR( String ),
        RELATION( Option<String>, Pairs<'a, Rule> )
    }
    
    // use this to help convert to and from sql
    #[derive(Debug)]
    pub struct AttrType<'a> {
        path: Attr<'a>,
        arguments_list: Arguments
    }

    impl<'a> Attr<'a> {
        pub fn parse_to_enum( 
            name: String,
            pairs:  Pairs<'a, Rule>,
            arguments_list: &Arguments,
            base_type: &Option<String>
        ) -> Attr<'a> {
            match name.as_str() {
                "id" => Self::PRIMARY_KEY,
                // get ddefault with its formatted default
                // SQL type ex. autoincrement() -> SERIAL
                "default" => Self::DEFAULT( format!( "{}", arguments_list ) ),
                "updatedAt" => Self::UPDATED_AT,
                // requires base_type which is the name 
                // of the foreign table, which is base_type 
                // in prisma schema
                // pass it alongside pairs, which is a span 
                // with the relation field so you can retreive all the data
                "relation" => Self::RELATION( base_type.clone(), pairs ),
                "unique" => Self::UNIQUE,
                // get ddefault with its formatted default
                // SQL type
                "db.VarChar" => Self::VAR_CHAR( format!( "{}", arguments_list ) ),
                _ => Self::UNIQUE
            }
        }
    }

    impl fmt::Display for Attr<'_> {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            match self {
                Self::PRIMARY_KEY => write!( f, "{}", "primary key" ),
                Self::DEFAULT( val ) => write!( f, "{}", format!( "default {val}" ) ),
                Self::UPDATED_AT => write!( f, "{}", "CURRENT_TIMESTAMP" ),
                Self::UNIQUE => write!( f, "{}", "unique" ),
                Self::VAR_CHAR( val ) => write!( f, "{}", format!( "character varying({})", val ) ),
                Self::RELATION( name, val ) => {
                    
                    let mut path: Option<String> = None;

                    let mut arguments_list: Arguments = Arguments::default();
                    
                    // get from pairs 
                    for curr in val.clone() {
                        
                        match curr.as_rule() {
                            Rule::path => {
                                path = Some( curr.as_str().to_string() );
                            },
                            Rule::arguments_list => {
                                let e = parse_arg_list( curr.into_inner(), &mut arguments_list );
                            },
                            _ => {}
                        }
                    }

                    // map fields into a string vector with just 
                    // the value of expression type
                    let fields: Vec<String> = arguments_list.arguments_list
                    .into_iter()
                    .map(
                        |arg| format!( "{}", arg.expression )
                    ).rev().collect();

                    // unpacking... [ primary key, foreign key ]
                    let [ ref pk, ref fk ] = fields[..] else { panic!() };

                    write!( f, "constraint foreign key({fk}) references {}({pk}) on update cascade on delete restrict", name.clone().unwrap() )
                },
                _ => todo!()
            }
        }
    }

    impl fmt::Display for AttrType<'_> {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            // format only path since arugments list gets compiled 
            // when converting to enum
            write!( f, "{}", format!( "{}", self.path ) )
        }
    }

    impl fmt::Display for FieldAttrType {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            // println!( "{}", self.arguments_list );

            match self.path.as_str() {
                "id" => write!( f, "{}", "primary key" ),
                "db.VarChar" => write!( f, "character varying({})", format!( "{}", self.arguments_list ) ),
                "default" => {
                    write!( f, "default {}", format!( "{}", self.arguments_list ) )
                },
                // "relation" => write!( "character varying({})", format!( "{}", self.arguments_list ) ),
                _ => write!( f, "{}", self.path )
            }
        }
    }

    pub fn parse_field_attribute<'a>( 
        mut pairs: &Pairs<'a, Rule>, 
        base_type: &Option<String> ) -> AttrType<'a> {

        let mut path: Option<String> = None;

        let mut arguments_list: Arguments = Arguments::default();

        for curr in pairs.clone() {
            
            match curr.as_rule() {
                Rule::path => {
                    path = Some( curr.as_str().to_string() );
                },
                Rule::arguments_list => {
                    let e = parse_arg_list( curr.into_inner(), &mut arguments_list );
                },
                _ => {}
            }
        }

        AttrType {
            path: Attr::<'a>::parse_to_enum( 
                path.unwrap(), 
                pairs.clone(),
                &arguments_list,
                base_type
            ),
            arguments_list
        }
        
        // println!( "{:?}", format!( "{}", e ) );

        // FieldAttrType { path: path.uwnrap(), arguments_list }
        // FieldAttrType { path: "".to_string(), arguments_list }
    }

    pub fn parse_field_type<'a>( pairs: Pairs<'a, Rule> ) -> FieldType<'a> {
    
        let mut name: Option<String> = None;
        let mut base_type_name: Option<String> = None;
        let mut attributes: Vec<AttrType<'a>> = Vec::new();
        let mut field: BaseTypes = BaseTypes {
            sql_type: Types::TEXT,
            is_optional: Optional::NOT_NULL,
            is_list: List::SINGLE        
        };
            
        for curr in pairs {
    
            match curr.as_rule() {
                Rule::field_type => {
                    // println!( "{:?}", curr.into_inner().next().unwrap() );
                    let e = &parse_base_type( curr.into_inner().next().unwrap() );
                    field = e.clone();
                    base_type_name = Some(format!( "{}", e.clone().sql_type ));
                },
                Rule::field_attribute => {
                    
                    attributes.push(
                        parse_field_attribute( &curr.into_inner(), &base_type_name )
                    );
                },
                Rule::identifier => {
                    name = Some( curr.as_str().to_string() );
                },
                _ => {}
            }
        }
        // println!( "{:?}", attributes );
        FieldType { name: name.unwrap(), field, attributes }
    }
}