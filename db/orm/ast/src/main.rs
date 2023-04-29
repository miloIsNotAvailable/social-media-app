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
use crate::sql_schema::parse_sql_schema::parse_schema;
use crate::parse_model::parse::parse_model;
use crate::parse_field::parse as field;

use crate::parse_base_type::parse as base_type;
use crate::parse_expression::parse as expression;

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

fn main() {

    let pairs = IdentParser::parse(Rule::schema, TABLES).unwrap_or_else(|e| panic!("{}", e));

    parse_schema::main();
    // println!( "{:?}", z );

    for inner in pairs {

        for pair in inner.into_inner() {
            match pair.as_rule() {
                Rule::model_declaration => {
                    let e = parse_model( pair.into_inner() );
                    println!( "{:?}", e );
                },
                _ => {}
            }
        }
    }
}
