// ----     boring file mod declarations     ----
// 
mod parse_model_declaration;
mod parse_namespace;
mod parse_column;
//
// ---- no more boring file mod declarations ----



// ---- std and file imports ----
//
use crate::schema::{ Rule, Pairs, Pair };
use crate::db_parse::ast::{ Model, ModelDeclaration };
use std::collections::HashMap;
use crate::db_parse::parser::parse_model_declaration as parse_model;
//
// ---- t-t-t-that's it folks ----



// main parse model function that .rs generates code
// 
// first .rs enums and types get generated for tables
// like so: 
//
// public::User { id: String; }
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// pub struct User { id: String }
//
// structs will be used to create SQL and ts types
// they will be also used for query language. 
//
// all types have implemented traits and functions for:
// 1. ts type generation
// 2. sql type generation 
// 
pub fn parse_model( pairs: Pairs<'_, Rule> ) {

    // parsed tables hash map
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

    // just for debugging purposes
    match parsed_tables.get( "User" ) {
        Some( data ) => { println!( "{:?}", data ); },
        None => { println!( "not found" ) }
    }
}
