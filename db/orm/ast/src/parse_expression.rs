pub mod parse {
        
    use crate::schema::{ Pairs, Rule, Pair };
    use std::fmt;

    #[derive(Debug, Clone)]
    pub struct Argument { 
        pub identifier: Option<Expr>, 
        pub expression: Expr 
    }

    #[derive(Debug, Clone)]
    pub enum Expr {
        NumericValue( String ),
        ConstantValue( String ),
        Function( String, Vec<String> ),
        Arr( Vec<Expr> ),
        // Relation( Expr::ConstantValue( String ), Expr )
    }

    impl fmt::Display for Expr {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            match self {
                Expr::NumericValue( val ) => fmt::Display::fmt( val, f ),
                Expr::ConstantValue( val ) => fmt::Display::fmt( val, f ),
                Expr::Function( val, call ) => {
                    match val.as_str() {
                        "autoincrement" => write!( f, "serial" ),
                        "now" => write!( f, "CURRENT_TIMESTAMP" ),
                        _ => todo!()
                    }
                },
                Expr::Arr( val ) => fmt::Display::fmt( "{val:?}", f ),
                _ =>  todo!()
            }
        }
    }

    impl fmt::Display for Argument {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            match &self.identifier {
                Some( id ) => write!( f, "{}({})", 
                    format!( "{}", id ), 
                    format!( "{}", self.expression ) 
                ),
                _ => write!( f, "{}", 
                    format!( "{}", self.expression ) 
                ),
            }

        }
    }

    fn unreachable(pair: &Pair<'_, Rule>) -> ! {
        unreachable!("Encountered impossible declaration during formatting: {pair:?}")
    }

    fn parse_array( mut pairs: Pairs<'_, Rule> ) -> Expr {

        let mut elements: Vec<Expr> = vec![];

        for curr in pairs {

            match curr.as_rule() {
                Rule::expression => elements.push( parse_expression_type( curr.into_inner() ) ),
                _ => unreachable!(
                    "Encountered impossible literal during parsing: {:?}",
                    curr.tokens()
                ),
            }
        }

        Expr::Arr( elements )
    }

    fn parse_named_arg( mut pairs: Pairs<'_, Rule> ) -> Argument {
        
        let mut identifier: Option<Expr> = None;
        let mut expression: Option<Expr> = None;

        let mut arr: Vec<Argument> = vec![];

        for curr in pairs {
            match curr.as_rule() {
                Rule::identifier => identifier = Some( 
                    Expr::ConstantValue( curr.as_str().to_string() )
                ),
                Rule::expression => expression = Some( 
                    parse_expression_type( curr.into_inner() ) 
                ),
                _ => {}
            }
        }

        match( identifier, expression ) {
            (Some( identifier ), Some( expression )) => Argument {
                identifier: Some( identifier ), 
                expression
            },
            _ => Argument { 
                identifier: Some( Expr::ConstantValue( "".to_string() ) ), 
                expression: Expr::ConstantValue( "".to_string() )
            }
        }
    }

    #[derive(Debug)]
    pub struct FunctionType {
        path: Option<String>,
        arguments_list: Option<String>
    }

    fn parse_function_type( mut pairs: Pairs<'_, Rule> ) -> Expr {

        let mut function_type = FunctionType {
            path: None,
            arguments_list: None
        };

        let mut args_list: Vec<String> = vec![];

        for curr in pairs {
            match curr.as_rule() {
                Rule::path => {
                    function_type.path = Some( curr.as_str().to_string() );
                },
                Rule::arguments_list => {
                    function_type.arguments_list = Some( 
                        curr.as_str().to_string() 
                    );
                    args_list.push( function_type.arguments_list.unwrap() );
                }
                _ => {}
            }
        }

        return Expr::Function( function_type.path.unwrap(), args_list )
    }

    pub fn parse_expression_type( mut pairs: Pairs<'_, Rule> ) -> Expr {

        let curr = pairs.next().unwrap();

        match curr.as_rule() {
            Rule::function_call => parse_function_type( curr.into_inner() ),
            Rule::path => Expr::ConstantValue( curr.as_str().to_string() ),
            Rule::numeric_literal => Expr::NumericValue( curr.as_str().to_string() ),
            Rule::array_expression => parse_array( curr.into_inner() ),
            _ => Expr::ConstantValue( "".to_string() )
        }
    }

    #[derive(Debug, Default)]
    pub struct Arguments {
        pub arguments_list: Vec<Argument>
    }

    // takes following args:
    // { function_call | array_expression | numeric_literal | string_literal | path }
    pub fn parse_arg_list( mut pairs: Pairs<'_, Rule>, args: &mut Arguments ) {
        
        // let mut arguments_list: Vec<Argument> = vec![];

        for curr in pairs {
            match curr.as_rule() {
                Rule::expression => args.arguments_list.push( 
                    Argument {
                        identifier: None,
                        expression: parse_expression_type( curr.into_inner() )
                    } 
                ),
                Rule::named_argument => args.arguments_list.push( 
                    parse_named_arg( curr.into_inner() ) 
                ),
                _ => {}
            }
        }
    }
}