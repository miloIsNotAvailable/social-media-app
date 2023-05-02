pub mod parse {

    use crate::schema::{ Pairs, Rule, Pair };
    use crate::base_type::{ parse_base_type, BaseType };
    use crate::expression::{ parse_arg_list, Arguments, Argument };
    use std::fmt;

    #[derive(Debug)]
    pub struct FieldType {
        pub name: String,
        pub field: BaseType,
        pub attributes: Vec<FieldAttrType>
    }
    
    impl fmt::Display for FieldType {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            let mut opt: String = "".to_string();
            let mut formatted_attrs: Vec<String> = vec![];

            for attr in &self.attributes {
                formatted_attrs.push( format!("{attr}") );
            }

            let base_type_formatted = format!( "{}", self.field);

            if base_type_formatted.is_empty() { return write!( f, "" ) };

            write!(f, "{} {} {}{}", 
                self.name, 
                base_type_formatted, 
                opt,
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
        arguments_list: &'a Arguments
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

    pub fn parse_field_attribute( mut pairs: &Pairs<'_, Rule>, base_type: &Option<String> ) -> FieldAttrType {

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

        let e = AttrType {
            path: Attr::<'_>::parse_to_enum( 
                path.unwrap(), 
                pairs.clone(),
                &arguments_list,
                base_type
            ),
            arguments_list: &arguments_list
        };
        
        println!( "{:?}", format!( "{}", e ) );

        // FieldAttrType { path: path.uwnrap(), arguments_list }
        FieldAttrType { path: "".to_string(), arguments_list }
    }

    pub fn parse_field_type( pairs: Pairs<'_, Rule> ) -> FieldType {
    
        let mut name: Option<String> = None;
        let mut base_type_name: Option<String> = None;
        let mut attributes: Vec<FieldAttrType> = Vec::new();
        let mut field: BaseType = BaseType {
            base_type: None,
            optional_type: None,
            list_type: None        
        };
            
        for curr in pairs {
    
            match curr.as_rule() {
                Rule::field_type => {
                    // println!( "{:?}", curr.into_inner().next().unwrap() );
                    let e = &parse_base_type( curr.into_inner().next().unwrap() );
                    field = e.clone();
                    base_type_name = e.clone().base_type;
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