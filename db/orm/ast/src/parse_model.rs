pub mod parse {
    
    use crate::parse_field;
    use crate::schema::{ Pairs, Rule };

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
    
    pub fn parse_model( pairs: Pairs<'_, Rule> ) {
    
        let mut name: Option<Identifier> = None;
    
        for curr in pairs {
            match curr.as_rule() {
                Rule::identifier => name = Some( Identifier { 
                    name: curr.as_str().to_string() 
                } ),
                // model keyword
                Rule::MODEL_KEYWORD => {
                    // println!( "{:?}", curr.as_str() );
                }, 
                Rule::model_contents => {
                    // println!( "{:?}", curr.into_inner() );
                    parse_field( curr.into_inner() );
                }, 
                _ => {}
            }
        }
    
        match name {
            Some( name ) => {
                println!( "{:?}", name );
            },
            _ => {}
        }
    }
}