// pub use pest::iterators::Pairs;
use crate::schema::{ Rule, Pairs, Pair };
use crate::db_parse::ast::{ Model, ModelDeclaration };
use std::collections::HashMap;

mod parse_model_declaration;
mod parse_namespace;
use crate::db_parse::parser::parse_model_declaration as parse_model;

pub fn parse_model( pairs: Pairs<'_, Rule> ) {

    let mut parsed_tables: HashMap<String, Model> = HashMap::new();

    // start parsing
    for inner in pairs {

        // get into -schema
        for pair in inner.into_inner() {
            
            match pair.as_rule() {
                
                // get model name and database
                //
                // public::User { ... }
                // ^^^^^^  ^^^^    
                // db      name
                //

                Rule::model_declaration => {
                    //
                    // -namespace
                    //   -...
                    // -column
                    //   -...
                    parse_model::parse_model_declaration( pair.into_inner(), &mut parsed_tables );                  
                },
                _ => {}
            }
        }
    }

    match parsed_tables.get( "User" ) {
        Some( data ) => { println!( "{:?}", data ); },
        None => { println!( "not found" ) }
    }
}
