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
        BOOL,
        // Table type 
        // if its an array it implies it being 
        // useless to me in actual sql schema  
        TABLE( String )
    }

    impl Types {
        pub fn parse_to_enum( name: String ) -> Types {
            match name.as_str() {
                "Int" => Types::INT,
                "String" => Types::TEXT,
                "DateTime" => Types::DATE_TIME,
                "Boolean" => Types::BOOL,
                val => Types::TABLE( val.to_string() )
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
        ARRAY,
        SINGLE
    }

    impl fmt::Display for List {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            match self {
                Self::ARRAY => write!( f, "[]" ),
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
        pub sql_type: Types,
        pub is_optional: Optional,
        pub is_list: List
    }


    impl fmt::Display for Types {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            match self {
                Self::TEXT => write!( f, "text" ),
                Self::INT => write!( f, "text" ),
                Self::DATE_TIME => write!( f, "timestamp with time zone" ),
                Self::BOOL => write!( f, "bool" ),
                Self::TABLE( val ) => write!( f, "{val}" ),
                _ => write!( f, "" )
            }
        }
    }
    
    impl fmt::Display for BaseTypes {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            write!( f, "{}{} {}",
                format!( "{}", self.sql_type ),
                format!( "{}", self.is_list ),
                format!( "{}", self.is_optional )
            )
        }
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

    pub fn parse_base_type( pairs: Pair<'_, Rule> ) -> BaseTypes {
    
        let mut field: BaseTypes = BaseTypes {
            sql_type: Types::TEXT,
            is_optional: Optional::NOT_NULL,
            is_list: List::SINGLE
        };
    
        match pairs.as_rule() {
            // get base type
            Rule::base_type => {
                field.sql_type = Types::parse_to_enum(pairs.as_str().to_string());
                // println!( "{}", pairs.as_str() );
            },
            // get optional type recursively
            Rule::optional_type => {
                field.is_optional = Optional::NULL;
                field.sql_type = parse_base_type( pairs.into_inner().next().unwrap() ).sql_type;
            },
            // get list type recursively
            Rule::list_type => {
                field.is_list = List::ARRAY;
                field.sql_type = parse_base_type( pairs.into_inner().next().unwrap() ).sql_type;
            },
            _ => {}
        }
        
        field
    }
}