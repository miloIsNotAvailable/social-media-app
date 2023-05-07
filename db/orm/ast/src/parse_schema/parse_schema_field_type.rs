pub mod parse_field_type {
    use crate::parse_schema::schema::{ Pairs, Rule };
    use crate::parse_schema::parse_schema_expression::parse_expression::{ Arguments, parse_arg_list };
    use crate::parse_schema::parse_schema_base_type::parse_base_type::{ BaseTypes };
    use crate::parse_schema::parse_schema_base_type::parse_base_type::parse_base_type;
    
    use std::fmt;

    #[derive(Debug)]
    pub struct FieldData {
        pub name: String,
        pub base_type: BaseTypes, 
        pub attributes: Vec<AttrType>
    }

    // basic idea behind this is to get constraints (relations, primary keys, unique rows)
    // in attributes to compile 
    // constraints gets compiled to "CONSTRAINT ..." row
    // and defaults etc. get attached to compiled name and base type
    // of the row
    impl FieldData {
        pub fn get_rows_compiled( &self ) -> Vec<String> {
            let mut fields: Vec<String> = vec![];
            // let mut row_type: Option<RowType> = None;

            self.attributes
            .iter()
            .for_each( |x| {
                let e = x.path.get_row_types( 
                    &self.name, 
                    &format!( "{}", self.base_type.sql_type ) 
                ); 

                match e {
                    RowType::Constraint( v ) => {
                        fields.push( v );
                    },
                    RowType::Row( v ) => {
                        if !self.base_type.sql_type.table_type_sql() {
                            fields.push(
                                format!( "{} {} {}", self.name, self.base_type, v )
                            );
                        }
                    },
                }
            } );
            
            if fields.is_empty() && !self.base_type.sql_type.table_type_sql() {
                fields.push(
                    format!( "{} {}", self.name, self.base_type )
                );
            }

            return fields.into_iter().map( |x| format!( "\t{x}" ) ).collect()
        }
    }

    #[derive(Debug)]
    pub enum FieldType {
        ConstraintType( FieldData ),
        Regular( FieldData )
    }

    // converting to enum, 
    // ill add a way to convert to both 
    // and from sql using those
    #[derive(Debug, PartialEq)]
    pub enum Attr {
        PrimaryKey( String ),
        Default( String ),
        // this gets mapped to Attr::DEFAULT( "now()" )
        UpdatedAt,
        Unique,
        VarChar( String ),
        Relation( String, String )
    }
    
    #[derive(Debug)]
    pub enum RowType {
        Constraint( String ),
        Row( String )
    }

    impl Attr {
        pub fn parse_to_enum( 
            path: &String, 
            args_list: &Arguments 
        ) -> Attr {
            match path.as_str() {
                "id" => Attr::PrimaryKey( format!( "{}", path.clone() ) ),
                "default" => Attr::Default( format!( "{}", args_list.clone() ) ),
                "updatedAt" => Attr::UpdatedAt,
                "unique" => Attr::Unique,
                "db.VarChar" => Attr::VarChar( format!( "{}", args_list.clone() ) ),
                "relation" => {

                    let fields_: Vec<String> = args_list.arguments_list
                    .clone()
                    .iter()
                    .map( |a| format!( "{}", a.expression ) )
                    .rev().collect();

                    // unpacking... [ primary key, foreign key ]
                    let [ ref pk, ref fk ] = fields_[..] else { panic!() };

                    Attr::Relation( pk.clone(), fk.clone() )
                },
                _ => todo!()
            }
        }

        pub fn get_row_types( 
            &self, 
            name: &String, 
            base_type: &String 
        ) -> RowType {
            use rand::Rng;

            // get random id for each constraint
            // in case there's multiple relations 
            // in one table
            // or primary keys with the same name
            const CHARSET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZ\
                                    abcdefghijklmnopqrstuvwxyz\
                                    0123456789_-";
            const PASSWORD_LEN: usize = 4;
            let mut rng = rand::thread_rng();
        
            let password: String = (0..PASSWORD_LEN)
                .map(|_| {
                    let idx = rng.gen_range(0..CHARSET.len());
                    CHARSET[idx] as char
                })
            .collect();

            match self {
                Self::PrimaryKey( val ) => {
                    RowType::Constraint( format!(
                        "constraint {}_{}_as_pkey primary key({})", 
                        name.clone(), password, name.clone()
                    ) )
                },
                // weird workaround 
                // but it makes it so 
                // both row and constraints for unique
                // are generated otherwise only constraint 
                // would be generated
                Self::Unique => {
                    RowType::Row( format!( 
                        ",\n\t{}",
                        format!(
                            "constraint {}_{}_as_uniq unique({})", 
                            name.clone(), password, name.clone()
                        ) 
                    ) )
                },
                Self::Relation( pk, fk ) => {
                    RowType::Constraint( format!(
                        "constraint {}_{}_fkey foreign key({fk}) references public.{}({pk}) on update cascade on delete restrict", 
                        base_type.clone(), password, base_type.clone()
                    ) )
                }
                Self::Default( val ) => RowType::Row( format!( "default {val}" ) ),
                Self::UpdatedAt => RowType::Row( format!( "default now()" ) ),
                _ => RowType::Row( String::from( "" ) )
            }
        }
    }

    impl fmt::Display for Attr {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            match self {
                Self::PrimaryKey( _ ) => write!( f, "{}", format!( "primary key" ) ),
                Self::Unique => write!( f, "{}", format!( "unique" ) ),
                Self::Default( val ) => write!( f, "{}", format!( "default {val}" ) ),
                Self::UpdatedAt => write!( f, "{}", "default now()" ),
                _ => todo!()
            }
        }
    }

    impl fmt::Display for AttrType {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            // format only path since arguments list gets compiled 
            // when converting to enum
            write!( f, "{}", format!( "{}", self.path ) )
        }
    }

    // use this to help convert to and from sql
    #[derive(Debug)]
    pub struct AttrType {
        pub path: Attr,
        pub arguments_list: Arguments
    }

    pub fn parse_field_attribute( pairs: Pairs<'_, Rule> ) -> AttrType {

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

        AttrType{ 
            path: Attr::parse_to_enum(
                &path.unwrap(),
                &arguments_list,
            ), 
            arguments_list 
        }
    }

    pub fn parse_field_type( pairs: Pairs<'_, Rule> ) -> FieldData {
    
        let mut name: Option<String> = None;
        let mut base_type_name: Option<BaseTypes> = None;
        let mut attributes: Vec<AttrType> = vec![];

        for curr in pairs {
    
            match curr.as_rule() {
                Rule::field_type => {
                    // println!( "{:?}", curr.into_inner().next().unwrap() );
                    base_type_name = Some(parse_base_type( curr.into_inner().next().unwrap() ));
                    // field = e.clone();
                    // base_type_name = Some(format!( "{}", e.clone().sql_type ));
                },
                Rule::field_attribute => {
                    
                    attributes.push(
                        parse_field_attribute( curr.into_inner() )
                    );
                },
                Rule::identifier => {
                    name = Some( curr.as_str().to_string() );
                },
                _ => {}
            }
        }
        // println!( "{:?}", attributes );
        FieldData { 
            name: name.unwrap(), 
            base_type: base_type_name.unwrap(), 
            attributes 
        }
    }
}