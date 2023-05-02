pub mod parse {
    #![allow(non_snake_case)]

    use crate::schema::{ Pairs, Rule, Pair };
    use std::fmt;

    #[derive(Debug, Clone, PartialEq)]
    pub struct Identifier {
        pub name: String,
    }
    
    #[derive(Debug)]
    pub struct Model {
        pub name: Identifier
    }
    
    #[derive(Debug,Clone, Default)]
    pub struct BaseType {
        pub base_type: Option<String>,
        pub optional_type: Option<bool>,
        pub list_type: Option<bool>
    }
    
    #[derive(Debug,Clone)]
    pub enum Types {
        INT,
        TEXT,
        DATE_TIME,
        // Table type 
        // if its an array it implies it being 
        // useless to me in actual sql schema  
        // so if its an array it'll get converted to string
        // an/or removed alltogether
        TABLE( List )
    }

    impl Types {
        pub fn parse_to_enum( name: String ) -> Types {
            match name.as_str() {
                "Int" => Types::INT,
                "String" => Types::TEXT,
                "DateTime" => Types::DATE_TIME,
                _ => Types::TEXT
            }
        }
    }

    #[derive(Debug,Clone)]
    pub enum Optional {
        NULL,
        NOT_NULL
    }

    #[derive(Debug,Clone)]
    pub enum List {
        LIST,
        SINGLE
    }

    impl fmt::Display for List {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            match self {
                Self::LIST => write!( f, "[]" ),
                Self::SINGLE => write!( f, "" ),
                _ => write!( f, "" ),
            }
        }
    }

    impl fmt::Display for Optional {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            match self {
                Self::NULL => write!( f, "null" ),
                Self::NOT_NULL => write!( f, "not null" ),
                _ => write!( f, "" ),
            }
        }
    }
    
    #[derive(Debug,Clone)]
    pub struct BaseTypes {
        sql_type: Types,
        is_optional: Optional,
        is_list: List
    }

    fn match_type( type__: String ) -> Option<String> {
        match type__.as_str() {                    
            "DateTime" => Some("timestamp with time zone".to_string()),
            "Int" => Some("integer".to_string()),
            "String" => Some("text".to_string()),
            "Boolean" => Some("bool".to_string()),
            _ => None
        }
    }

    impl fmt::Display for BaseType {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            let mut opt: Option<String> = None;
    
            match self.optional_type {
                Some( v ) => opt = Some("null".to_string()),
                _ => opt = Some("not null".to_string()),
                _ => {}
            }

            match &self.base_type {
                Some( t ) => {
                    let type_ = match_type( t.to_string() );
                    match type_ {
                        Some( t_ ) => write!(f, "{} {}", t_, opt.unwrap() ),
                        _  => write!( f, "" )
                    }
                },
                _ => { 
                    write!(f, "" )
                }
            }
        }
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
                field.base_type = parse_base_type( pairs.into_inner().next().unwrap() ).base_type;
            },
            // get list type recursively
            Rule::list_type => {
                field.list_type = Some( true );
                field.base_type = parse_base_type( pairs.into_inner().next().unwrap() ).base_type;
            },
            _ => {}
        }
        
        field
    }
}