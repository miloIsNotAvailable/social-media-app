pub mod parse {

    use crate::schema::{ Pairs, Rule, Pair };
    use crate::parse::{ parse_field_type, FieldType };
    use std::fmt;

    #[derive(Debug)]
    pub struct Field<'a> {
        pub field: Vec<FieldType<'a>>
    }
    
    impl fmt::Display for Field<'_> {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            let mut parsed: Vec<String> = vec![];

            for field in &self.field {
                // check for leftover empty strings
                let formatted = format!( "{field}" );
                if formatted.is_empty() == false {
                    // format... format? and add tabs
                    parsed.push( format!( "\t{formatted}" ) );
                }
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
                        parse_field_type( curr.clone().into_inner(), curr.clone() )
                    );
                },
                _ => {}
            }        
        }

        Field { field } 
    }
}