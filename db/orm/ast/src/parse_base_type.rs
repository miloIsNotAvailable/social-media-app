pub mod parse {
    #![allow(non_snake_case)]

    use crate::schema::{ Pairs, Rule, Pair };
    use std::fmt;
    use crate::parse::{ parse_field_type, FieldType, Attr, AttrType };

    #[derive(Debug, Clone, PartialEq)]
    pub struct Identifier {
        pub name: String,
    }
    
    #[derive(Debug)]
    pub struct Model {
        pub name: Identifier
    }
    
    #[derive(Debug,Clone)]
    pub struct BaseType {
        pub base_type: Option<String>,
        pub optional_type: Option<bool>,
        pub list_type: Option<bool>
    }
    
    #[derive(Debug, Clone)]
    pub enum Types<'a> {
        INT( Pair<'a, Rule> ),
        TEXT( Pair<'a, Rule> ),
        DATE_TIME( Pair<'a, Rule> ),
        BOOL( Pair<'a, Rule> ),
        // Table type 
        // if its an array it implies it being 
        // useless to me in actual sql schema  
        TABLE( String )
    }

    impl<'a> Types<'a> {
        pub fn parse_to_enum( 
            name: String, 
            parent: Pair<'a, Rule> 
        ) -> Types<'a> {
            match name.as_str() {
                "Int" => Types::INT( parent ),
                "String" => Types::TEXT( parent ),
                "DateTime" => Types::DATE_TIME( parent ),
                "Boolean" => Types::BOOL( parent ),
                val => Types::TABLE( val.to_string() )
            }
        }
    }

    #[derive(Debug, Clone)]
    pub enum Optional {
        NULL,
        NOT_NULL
    }

    #[derive(Debug, Clone)]
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
    
    #[derive(Debug, Clone)]
    pub struct BaseTypes<'a> {
        pub sql_type: Types<'a>,
        pub is_optional: Optional,
        pub is_list: List
    }


    impl fmt::Display for Types<'_> {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            match self {
                Self::TEXT( pairs ) => {
                    // let mut attr_arr: Vec<Vec<AttrType>> = vec![];
                    // for curr in pairs.clone().into_inner() {

                    //     attr_arr.push( parse_field_type( pairs.clone().into_inner(), pairs.clone() ).attributes );
                    // }
                
                    // let [ ref p, .. ] = attr_arr[..] else { todo!() };
                    // let [ ref path, .. ] = p[..] else { todo!() };

                    // match ( &path.path ) {
                    //     ( Attr::VAR_CHAR( val ) ) => println!( "character" ),
                    //     ( Attr::DEFAULT( val ) ) => {
                    //         match val.as_str() {
                    //             "generate_uuid_v4()" => println!( "uuid" ),
                    //             "serial" => println!( "serial" ),
                    //             a => println!( "{a}" ),
                    //         }
                    //     },
                    //     _ => println!( "text" ) 
                    // };
                    write!( f, "text" ) 
                },
                Self::INT( pairs ) => write!( f, "integer" ),
                Self::DATE_TIME( pairs ) => write!( f, "timestamp with time zone" ),
                Self::BOOL( pairs ) => write!( f, "bool" ),
                Self::TABLE( val ) => write!( f, "{val}" ),
                _ => write!( f, "" )
            }
        }
    }
    
    impl fmt::Display for BaseTypes<'_> {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            write!( f, "{}{} {}",
                format!( "{}", self.sql_type ),
                format!( "{}", self.is_list ),
                format!( "{}", self.is_optional )
            )
        }
    }

    pub fn parse_base_type<'a>( pairs: Pair<'a, Rule>, parent: Pair<'a, Rule> ) -> BaseTypes<'a> {
    
        let mut field: BaseTypes = BaseTypes {
            sql_type: Types::TEXT( parent.clone() ),
            is_optional: Optional::NOT_NULL,
            is_list: List::SINGLE,
        };
    
        match pairs.as_rule() {
            // get base type
            Rule::base_type => {
                field.sql_type = Types::parse_to_enum( pairs.as_str().to_string(), parent );
                // println!( "{}", pairs.as_str() );
            },
            // get optional type recursively
            Rule::optional_type => {
                field.is_optional = Optional::NULL;
                field.sql_type = parse_base_type( pairs.into_inner().next().unwrap(), parent ).sql_type;
            },
            // get list type recursively
            Rule::list_type => {
                field.is_list = List::ARRAY;
                field.sql_type = parse_base_type( pairs.into_inner().next().unwrap(), parent ).sql_type;
            },
            _ => {}
        }
        
        field
    }
}