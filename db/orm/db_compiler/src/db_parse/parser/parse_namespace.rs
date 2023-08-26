use crate::schema::{ Rule, Pairs, Pair };
use crate::db_parse::ast::{ Model, ModelDeclaration };
use std::collections::HashMap;

pub fn parse_namespace<'a>( pairs: Pairs<'_, Rule> ) -> ModelDeclaration {
    
    let mut d: ModelDeclaration = ModelDeclaration { 
        database: String::from( "" ),
        name: String::from( "" ) 
    };

    for pair in pairs {
        match pair.as_rule() {
            
            Rule::name  => { d.database = pair.as_span().as_str().to_string() },
            Rule::enum_ => { d.name = pair.as_span().as_str().to_string() }
            // useless
            Rule::scope_resolution_operator => {},
            _ => panic!()
        }
    }

    println!("{:?}", d.clone());
    d.clone()
}