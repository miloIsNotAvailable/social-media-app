pub mod parse {
    use crate::schema::{ Pairs, Rule, Pair };

    #[derive(Debug, Clone, PartialEq)]
    pub struct Identifier {
        pub name: String,
    }
    
    #[derive(Debug)]
    pub struct Model {
        pub name: Identifier
    }
    
    #[derive(Debug)]
    pub struct BaseType {
        pub base_type: Option<String>,
        pub optional_type: Option<bool>,
        pub list_type: Option<bool>
    }
    
    pub fn parse_base_type( pairs: Pair<'_, Rule> ) -> BaseType {
    
        let mut field: BaseType = BaseType {
            base_type: None,
            optional_type: None,
            list_type: None
        };
    
        match pairs.as_rule() {
            // get base type
            Rule::base_type => {
                field.base_type = Some(pairs.as_str().to_string());
                // println!( "{}", pairs.as_str() );
            },
            // get optional type recursively
            Rule::optional_type => {
                field.optional_type = Some( true );
                parse_base_type( pairs.into_inner().next().unwrap() );
            },
            // get list type recursively
            Rule::list_type => {
                field.list_type = Some( true );
                parse_base_type( pairs.into_inner().next().unwrap() );
            },
            _ => {}
        }
        
        field
    }
}