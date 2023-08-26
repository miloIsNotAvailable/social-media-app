use crate::schema::{ Rule, Pairs, Pair };
use crate::db_parse::ast::{ Model, ModelDeclaration };
use std::collections::HashMap;
use crate::db_parse::parser::parse_namespace::parse_namespace;

pub fn parse_model_declaration<'a>( pairs:            Pairs<'_, Rule>, 
                                    mut parse_tables: &mut HashMap<String, Model> 
) {

    let mut declaration: ModelDeclaration = ModelDeclaration { 
        database: String::from( "" ),
        name: String::from( "" ) 
    };

    for pair in pairs {

        match pair.as_rule() {
            
            Rule::namespace => {
                declaration = parse_namespace( pair.into_inner(), &mut declaration );
            },
            Rule::column        => {},
            Rule::BLOCK_OPEN    => {}, 
            Rule::BLOCK_CLOSE   => {},
            Rule::comment_block => {},
            _ => panic!()
        }
    }

    parse_tables.insert( 
        declaration.clone().name, 
        Model { 
            model_declaration: Some( declaration ),
            columns: None
        } 
    );

}