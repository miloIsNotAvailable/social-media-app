pub mod parse_base_type {
    
    use crate::parse_schema::schema::{ Pair, Rule };
    use std::fmt;

    #[derive(Debug, Clone)]
    pub enum Types {
        Int,
        Text,
        DateTime,
        Bool,
        // Table type 
        // if its an array it implies it being 
        // useless to me in actual sql schema  
        Table( String )
    }

    impl Types {
        pub fn parse_to_enum( 
            name: String, 
        ) -> Types {
            match name.as_str() {
                "Int" => Types::Int,
                "String" => Types::Text,
                "DateTime" => Types::DateTime,
                "Boolean" => Types::Bool,
                val => Types::Table( val.to_string() )
            }
        }

        pub fn key_default_type( &self ) -> (String, String) {
            match self {
                Self::Int => ("serial".to_string(), "".to_string()),
                Self::Text => ("uuid".to_string(), "default uuid_v4s()".to_string()),
                _ => (format!( "{self}" ), "".to_string())
            }
        }

        pub fn table_type_sql( &self ) -> bool {
            match self {
                Self::Table( _ ) => true,
                _ => false
            }
        }
    }

    #[derive(Debug, Clone)]
    pub enum Optional {
        Null,
        NotNull
    }

    #[derive(Debug, Clone)]
    pub enum List {
        Vector,
        Scalar
    }

    impl fmt::Display for List {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            match self {
                Self::Vector => write!( f, "[]" ),
                Self::Scalar => write!( f, "" ),
                _ => write!( f, "" ),
            }
        }
    }

    impl fmt::Display for Optional {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            match self {
                Self::Null => write!( f, "null" ),
                Self::NotNull => write!( f, "not null" ),
                _ => write!( f, "" ),
            }
        }
    }
    
    #[derive(Debug, Clone)]
    pub struct BaseTypes {
        pub sql_type: Types,
        pub is_optional: Optional,
        pub is_list: List
    }


    impl fmt::Display for Types {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            match self {
                Self::Text => {
                    write!( f, "text" ) 
                },
                Self::Int => write!( f, "integer" ),
                Self::DateTime => write!( f, "timestamp with time zone" ),
                Self::Bool => write!( f, "bool" ),
                Self::Table( val ) => write!( f, "{val}" ),
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

    pub fn parse_base_type( pairs: Pair<'_, Rule> ) -> BaseTypes {
        let mut field: BaseTypes = BaseTypes {
            sql_type: Types::Text,
            is_optional: Optional::NotNull,
            is_list: List::Scalar,
        };

        match pairs.as_rule() {
            // get base type
            Rule::base_type => {
                field.sql_type = Types::parse_to_enum( pairs.as_str().to_string() );
                // println!( "{}", pairs.as_str() );
            },
            // get optional type recursively
            Rule::optional_type => {
                field.is_optional = Optional::Null;
                field.sql_type = parse_base_type( pairs.into_inner().next().unwrap() ).sql_type;
            },
            // get list type recursively
            Rule::list_type => {
                field.is_list = List::Vector;
                field.sql_type = parse_base_type( pairs.into_inner().next().unwrap() ).sql_type;
            },
            _ => {}
        }
        field
    }   
}