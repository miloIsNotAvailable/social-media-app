#![allow(non_snake_case)]

extern crate pest;
#[macro_use]
extern crate pest_derive;

mod parse_model;
mod parse_field;
mod parse_field_type;
mod parse_base_type;
mod parse_expression;
mod sql_schema;
// mod sql_schema::parse_sql_schema;

use crate::parse_field_type::parse;
use crate::sql_schema::sql_migrations::create_sql_migration;
use crate::parse_model::parse::parse_model;
use crate::parse_model::parse::ParseModelSchema;
use crate::parse_field::parse as field;

use crate::parse_base_type::parse as base_type;
use crate::parse_expression::parse as expression;

use std::fs::File;
use std::io::prelude::*;

use std::fmt;

pub mod schema {
    
    pub use pest::Parser;
    pub use pest::iterators::Pairs;
    pub use pest::iterators::Pair;

    #[derive(Parser)]
    #[grammar = "./ident.pest"]
    pub struct IdentParser;
}

use crate::schema::{ Parser, Rule, IdentParser };

// #[derive(Parser)]
// #[grammar = "./ident.pest"]
// pub struct IdentParser;

static TABLES: &str = r"
model User {
    id        Int      @id @default(autoincrement())
    createdAt DateTime @default(now())
    email     String   @unique
    name      String?
    posts     Post[]
}
  
model Post {
    id        Int      @id @default(autoincrement())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    published Boolean  @default(false)
    title     String   @db.VarChar(255)
    author    User?    @relation(fields: [authorId], references: [id])
    authorId  Int?
}";

fn main() -> std::io::Result<()> {

    let mut file = File::open("schema.prisma")?;
    let mut contents = String::new();    
    file.read_to_string(&mut contents)?;

    let pairs = IdentParser::parse(Rule::schema, &contents).unwrap_or_else(|e| panic!("{}", e));

    // create_sql_migration::parse_sql_file();
    // create_sql_migration::generate_sql_file();

    let mut schema_parsed: Vec<String> = vec![];
    // let mut file = File::create( "sql_db.sql" )?;
    // let mut schema_as_sql: String = "".to_string();

    for inner in pairs {

        for pair in inner.into_inner() {
            match pair.as_rule() {
                Rule::model_declaration => {
                    let e = parse_model( pair.into_inner() );
                    
                    let schema_as_sql = format!( "{}(\n{}\n);", e.name, e.fields );
                    schema_parsed.push( schema_as_sql );
                },
                _ => {}
            }
        }
    }

    create_sql_migration::compare_files( schema_parsed.join( "\n" ) );

    // file.write_all( schema_parsed.join( "\n\n" ).as_str().as_bytes() )?;
    Ok(())
}
