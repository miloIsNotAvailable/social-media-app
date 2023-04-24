pub mod parse {
        
    use crate::schema::{ Pairs, Rule, Pair };

    #[derive(Debug)]
    pub struct Expression {
        pub path: Option<String>,
        pub function_call: Option<String>,
        pub array_expression: Option<String>,
        pub numeric_literal: Option<String>,
        pub string_literal: Option<String>,
    }

    #[derive(Debug)]
    pub enum Expr {
        NumericValue( String )
    }

    

    fn parse_array( mut pairs: Pairs<'_, Rule> ) {

        // println!( "{}", pairs );

        for curr in pairs {
            match curr.as_rule() {
                Rule::expression => { 
                    // println!( "{}", curr.into_inner().next().unwrap().into_inner() );
                    parse_expression_type( curr.into_inner() );
                },
                _ => {}
            }
        }
    }

    fn parse_named_arg( mut pairs: Pairs<'_, Rule> ) {
        
        for curr in pairs {
            match curr.as_rule() {
                Rule::identifier => {
                    println!( "{:?}", curr.as_str() );
                },
                Rule::expression => {
                    let parsed = parse_expression_type( curr.into_inner() );
                    // println!( "{:?}", p );
                },
                _ => {}
            }
        }
    }

    #[derive(Debug)]
    pub struct FunctionType {
        path: Option<String>,
        arguments_list: Option<String>
    }

    fn parse_function_type( mut pairs: Pairs<'_, Rule> ) -> FunctionType {

        let mut function_type = FunctionType {
            path: None,
            arguments_list: None
        };

        for curr in pairs {
            match curr.as_rule() {
                Rule::path => {
                    function_type.path = Some( curr.as_str().to_string() );
                    // println!( "yeyeye {}", curr.as_str() );
                },
                Rule::arguments_list => {
                    function_type.arguments_list = Some( curr.as_str().to_string() )
                    // println!( "yayayay {}", curr.as_str() );
                }
                _ => {}
            }
        }

        return function_type
    }

    pub fn parse_expression_type( mut pairs: Pairs<'_, Rule> ) {

        for curr in pairs {
            match curr.as_rule() {
                Rule::function_call => {
                    let e = parse_function_type( curr.into_inner() );
                    // println!( "{:?}", e );
                },
                Rule::path => {
                    println!( "{}", curr.as_str() );
                },
                Rule::numeric_literal => {
                    println!( "{:?}", Expr::NumericValue( curr.as_str().to_string() ) );
                },
                Rule::identifier => {
                    println!( "{}", curr.as_str() );
                },
                Rule::array_expression => {
                    // println!( "fasfasdf {}", curr.as_str() );
                    parse_array( curr.into_inner() );
                },
                _ => {}
            }
        }
    }

    // takes following args:
    // { function_call | array_expression | numeric_literal | string_literal | path }
    pub fn parse_expression( mut pairs: Pairs<'_, Rule> ) {
        
        let mut expression = Expression {
            path: None,
            function_call: None,
            array_expression: None,
            numeric_literal: None,
            string_literal: None
        };

        for curr in pairs {
            match curr.as_rule() {
                Rule::identifier => {
                    println!( "{:?}", curr.as_str() );
                },
                Rule::path => {
                    println!( "{:?}", curr.as_str() );
                },
                Rule::expression => {
                    parse_expression_type( curr.into_inner() );
                }
                Rule::named_argument => {
                    // println!( "{:?}", curr.into_inner() );
                    parse_named_arg( curr.into_inner() );
                },
                _ => {}
            }
        }
    }
}