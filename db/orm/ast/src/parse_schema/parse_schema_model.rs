pub mod parse_model_schema {

    use crate::parse_schema::schema::{ Pairs, Rule };
    use crate::parse_schema::parse_schema_fields::parse_fields;
    use crate::parse_schema::parse_schema_fields::parse_fields::{ Field };
    use crate::parse_schema::parse_schema_field_type::parse_field_type::{ FieldData };
    
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