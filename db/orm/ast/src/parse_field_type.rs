pub mod parse {

    use crate::schema::{ Pairs, Rule, Pair };
    use crate::base_type::{ parse_base_type, BaseType };

    #[derive(Debug)]
    pub struct FieldType {
        pub name: Option<String>,
        pub field: BaseType
    }
    
    pub fn parse_field_type( pairs: Pairs<'_, Rule> ) -> FieldType {
    
        let mut name: Option<String> = None;
        let mut field: BaseType = BaseType {
            base_type: None,
            optional_type: None,
            list_type: None
        };
    
        for curr in pairs {
    
            match curr.as_rule() {
                Rule::field_type => {
                    // println!( "{:?}", curr.into_inner().next().unwrap() );
                    field = parse_base_type( curr.into_inner().next().unwrap() );
                },
                Rule::field_attribute => {
                    
                    // println!(  "{}", curr.into_inner() );
                },
                Rule::identifier => {
                    name = Some( curr.as_str().to_string() );
                    // println!( "{:?}", curr.as_str() );
                },
                _ => {}
            }
        }
        // println!( "{:?}", field );
        return FieldType { name, field };
    }
}