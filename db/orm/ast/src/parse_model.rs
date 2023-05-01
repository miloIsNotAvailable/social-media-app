pub mod parse {
    
    // use crate::parse_field;
    use crate::field::{ parse_field, Field };
    use crate::schema::{ Pairs, Rule };
    use std::fmt;

    #[derive(Debug, Clone, PartialEq)]
    pub struct Identifier {
        pub name: String,
    }
    
    #[derive(Debug)]
    pub struct Model {
        pub name: ParseModelSchema,
        pub fields: ParseModelSchema
    }
    
    #[derive(Debug)]
    pub struct BaseType {
        pub base_type: Option<String>,
        pub optional_type: Option<bool>,
        pub list_type: Option<bool>
    }
    
    #[derive(Debug)]
    pub enum ParseModelSchema {
        Name( String ),
        Fields( Vec<Field> )
    }

    impl fmt::Display for ParseModelSchema {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            match self {
                ParseModelSchema::Name( val ) => fmt::Display::fmt( val, f ),
                ParseModelSchema::Fields( val ) => {
                    
                    let mut e: Vec<String> = vec![];

                    for v in val {

                        e.push( format!("{v:?}") )
                    }

                    write!( f, "{}", e.join( ",\n" ) )
                },
                _ =>  todo!()
            }
        }
    }

    impl ParseModelSchema {
        pub fn name( &self ) -> String {
            match self {
                ParseModelSchema::Name( val ) => val.to_string(),
                _ => todo!()
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
                    fields.push( parse_field( curr.into_inner() ) );
                }, 
                _ => {}
            }
        }

        println!( "{}", ParseModelSchema::Name( name.clone().unwrap() ).name() );

        Model {
            name: ParseModelSchema::Name( name.unwrap() ),
            fields: ParseModelSchema::Fields( fields )
        }
    }
}