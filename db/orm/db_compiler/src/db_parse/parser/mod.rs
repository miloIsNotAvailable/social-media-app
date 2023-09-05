// ----     boring file mod declarations     ----
// 
mod parse_model_declaration;
mod parse_namespace;
mod parse_column;
mod parse_base_type;
mod parse_arguments_list;
mod parse_function;
mod parse_argument;
//
// ---- no more boring file mod declarations ----



// ---- std and file imports ----
//
use crate::schema::{ Rule, Pairs };
use crate::db_parse::ast::{ Model, Generation };
use std::collections::HashMap;
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

// // impl traits for each struct
// pub trait Generation {
//     // this will generate rust structs that 
//     // then will be compiled to wasm
//     // with js' pg librsry for querying 
//     // each rust class will have it's own 
//     // function for generating queries etc.
//     //
//     generate_rust_classes( &self ) {}
    
//     // this will generate sql migrations etc.
//     // for updating schema
//     //
//     generate_sql_tables( &self ) {}
//     // generates ts types for each sql table
//     generate_ts_types( &self ) {}
// }

impl Schema {

    pub fn generate_rust_enums( &self ) {
        for ( table_name, details ) in &self.parsed_tables {
            println!( "parsing table {:?}", table_name );

            let parsed_enum = details.generate_rust_classes();
            println!( "{}", parsed_enum );
        }
    }

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