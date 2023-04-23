extern crate pest;
#[macro_use]
extern crate pest_derive;

use pest::Parser;
use pest::iterators::Pairs;

#[derive(Parser)]
#[grammar = "./ident.pest"]
struct IdentParser;

pub fn parse_model( pairs: Pairs<'_, Rule> ) {

    let mut name: Option<Identifier> = None;

    for curr in pairs {
        match curr.as_rule() {
            Rule::identifier => name = Some(  Identifier { 
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