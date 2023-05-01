pub mod parse {

    use crate::schema::{ Pairs, Rule, Pair };
    use crate::parse::{ parse_field_type, FieldType };
    use std::fmt;

    #[derive(Debug)]
    pub struct Field {
        pub field: Vec<FieldType>
    }
    
    impl fmt::Display for Field {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            let mut parsed: Vec<String> = vec![];

            for field in &self.field {
                parsed.push( format!( "{field}" ) );
            }
            write!(f, "{}", parsed.join( ",\n" ) )
        }
    }

    pub fn parse_field( pairs: Pairs<'_, Rule> ) -> Field {
    
        let mut field: Vec<FieldType> = vec![];

        for curr in pairs {
    
            match curr.as_rule() {
                Rule::field_declaration => {
                    field.push(
                        parse_field_type( curr.into_inner() )
                    );
                },
                _ => {}
            }        
        }

        Field { field } 
    }
}