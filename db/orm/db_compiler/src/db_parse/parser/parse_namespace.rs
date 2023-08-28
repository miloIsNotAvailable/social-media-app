// ---- std and file imports ----
//
use crate::schema::{ Rule, Pairs };
use crate::db_parse::ast::{ ModelDeclaration };
use crate::db_parse::parser::{ Schema };
//
// ---- t-t-t-that's it folks ----

// parses database and name
//
// public::User { ... }
// ^^^^^^  ^^^^    
// db      name
//
impl Schema {
    pub fn parse_namespace<'a>( &mut self, pairs: Pairs<'_, Rule> ) -> Option<ModelDeclaration> {
    
        // sets the model declaration part
        let mut d: ModelDeclaration = ModelDeclaration { 
            database: String::from( "" ),
            name: String::from( "" ) 
        };
    
        // - namespace                            # you're here
        //     - enum_: "..."                     # database
        //     - name: "..."                      # name
        //     - scope_resolution_operator: "..." # syntax
        for pair in pairs {
    
            //
            // - enum_: "..."                     # you're here
            // - ...
            match pair.as_rule() {
                
                Rule::name  => { d.database = pair.as_span().as_str().to_string() },
                Rule::enum_ => { d.name = pair.as_span().as_str().to_string() }
                
                // useless
                // public::User { ... }
                //       ^^
                //      this
                // 
                Rule::scope_resolution_operator => {},
                _ => panic!()
            }
        }
    
        // return set model declaration
        Some( d.clone() )
    }
}