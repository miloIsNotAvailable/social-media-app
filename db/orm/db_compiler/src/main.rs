use wasm_bindgen::prelude::*;

extern crate pest;
#[macro_use]
extern crate pest_derive;

pub mod schema {
    
    pub use pest::Parser;
    pub use pest::iterators::Pairs;
    pub use pest::iterators::Pair;

    #[derive(Parser)]
    #[grammar = "./ident.pest"]
    pub struct IdentParser;
}

pub use schema::{ Parser, Pairs, Rule, IdentParser };

mod db_parse;
use crate::db_parse::parser::parse_model;

use std::fs::File;
use std::io::prelude::*;
use std::fs::OpenOptions;

use std::fmt;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen(start)]
pub fn run() {
    log("Hello, World!");
}

fn main() -> std::io::Result<()> {

    let schema_path: &str = "./src/schema.db";

    let mut file = File::open( schema_path )?;
    let mut contents = String::new();    

    file.read_to_string(&mut contents)?;

    let pairs = IdentParser::parse(Rule::schema, &contents)
    .unwrap_or_else(|e| panic!("{}", e));

    parse_model( pairs );

    Ok( () )
}