pub mod parse_model_schema {

    use crate::parse_schema::schema::{ Pairs, Rule };
    use crate::parse_schema::parse_schema_fields::parse_fields;
    use crate::parse_schema::parse_schema_fields::parse_fields::{ Field };
    use crate::parse_schema::parse_schema_field_type::parse_field_type::{ FieldData };
    use crate::parse_schema::parse_schema_base_type::parse_base_type::{ Types };

    use std::fmt;

    #[derive(Debug)]
    pub enum ParseModelSchema {
        Name( String ),
        Fields( Vec<Field> )
    }

    #[derive(Debug)]
    pub struct Model {
        pub name: ParseModelSchema,
        pub fields: ParseModelSchema
    }

    impl ParseModelSchema {
        pub fn generate_ts_types( &self ) -> String {

            // let type_name: Option<String> = None;
            let mut type_fields: Vec<String> = vec![];


            match self {
                Self::Name( name ) => name.to_string(),
                Self::Fields( fields_vec ) => {
                    for field in fields_vec {
                        
                        for field_type in &field.field {
                            type_fields.push( field_type.conv_to_ts() );
                        }
                    }

                    type_fields.join( ",\n" )
                } 
            }

            // println!( "type {type_name} {}",  );
        }
    }

    impl fmt::Display for ParseModelSchema {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            match self {
                Self::Name( name ) => write!( f, "create table if not exists public.{name}" ),
                Self::Fields( fields ) => {

                    let mut formatted: Vec<String> = vec![];

                    for field in fields {
                        for f in &field.field {
                            let mut compiled = f.get_rows_compiled();
                            
                            match compiled {
                                Some( mut c ) => formatted.append( &mut c ),
                                None => {}
                            }
                            
                        }
                    }
            
                    write!( f, "{}", formatted.join( ",\n" ) )
                }
            }
        }
    }

    pub fn parse_model( pairs: Pairs<'_, Rule> ) -> Model {
        
        let mut name: Option<String> = None;
        let mut fields: Vec<Field> = vec![];
    
        for curr in pairs {
            match curr.as_rule() {
                Rule::identifier => name = Some( 
                    curr.as_str().to_string() 
                ),
                // model keyword
                Rule::MODEL_KEYWORD => {}, 
                Rule::model_contents => {
                    // println!( "{:?}", curr.into_inner() );
                    fields.push(
                        parse_fields::parse_field( curr.into_inner() )
                    );
                }, 
                _ => {}
            }
        }

        Model {
            name: ParseModelSchema::Name( name.unwrap() ),
            fields: ParseModelSchema::Fields( fields )
        }
    }
}