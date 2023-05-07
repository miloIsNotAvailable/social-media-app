pub mod parse_schema_model;
pub mod parse_schema_fields;
pub mod parse_schema_field_type;
pub mod parse_schema_expression;
pub mod parse_schema_base_type;

pub mod schema {
    pub use pest::Parser;
    pub use pest::iterators::Pairs;
    pub use pest::iterators::Pair;
    
    use std::fs::File;
    use std::io::prelude::*;
    use std::fs::OpenOptions;

    use std::fmt;

    use crate::parse_schema::parse_schema_model::parse_model_schema;

    #[derive(Parser)]
    #[grammar = "./ident.pest"]
    pub struct IdentParser;
    
    pub fn parse_schema() -> std::io::Result<String> {
        let mut file = File::open("schema.prisma")?;
        let mut contents = String::new();    
        file.read_to_string(&mut contents)?;
    
        let pairs = IdentParser::parse(Rule::schema, &contents).unwrap_or_else(|e| panic!("{}", e));
    
        let mut schema_parsed: Vec<String> = vec![];
    
        for inner in pairs {
    
            for pair in inner.into_inner() {
                match pair.as_rule() {
                    Rule::model_declaration => {
                        let e = parse_model_schema::parse_model( pair.into_inner() );
                        
                        
                        let schema_as_sql = format!( "{}(\n{}\n);", e.name, e.fields );
                        // println!( "{}", schema_as_sql );
                        schema_parsed.push( schema_as_sql );
                    },
                    _ => {}
                }
            }
        }

        Ok( schema_parsed.join( "\n\n" ) )
    }
}