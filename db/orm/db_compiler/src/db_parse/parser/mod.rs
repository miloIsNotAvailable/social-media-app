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
// pub struct User { id: SqlString }
// 
// types like String will be already implemented 
// with types like SqlString, and during intermediate 
// code generation functions like String::length( 256 )
// will be converted to SqlString::length( 256 ) and will 
// check for any missing arguments etc.
//
// structs will be used to create SQL and ts types
// they will be also used for query language. 
//
// all types have implemented traits and functions for:
// 1. ts type generation
// 2. sql type generation 
// 

//
// main building block
// initiates the compiler
// 
// let mut c = Schema::new()
// c.parse_model( pairs )
//
pub struct Schema {
    // hash table for storing models
    // to be used later in compilation
    pub parsed_tables: HashMap<String, Model>
}

impl Schema {

    // initiates a new Schema struct
    // by assigning a hash table to it 
    pub fn new() -> Self {
        // parsed tables hash map
        let mut parsed_tables: HashMap<String, Model> = HashMap::new();
        
        Self { parsed_tables }
    }

    pub fn parse_model( &mut self, pairs: Pairs<'_, Rule> ) {

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
                        self.parse_model_declaration( pair.into_inner() );                  
                    },
                    _ => {}
                }
            }
        }
    
        // just for debugging purposes
        match self.parsed_tables.get( "User" ) {
            Some( data ) => { println!( "{:?}", data ); },
            None => { println!( "not found" ) }
        }
    }
}
