pub mod parse {

    use crate::schema::{ Pairs, Rule, Pair };
    use crate::parse::{ parse_field_type, FieldType };

    #[derive(Debug)]
    pub struct Field {
        pub field: Vec<FieldType>
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