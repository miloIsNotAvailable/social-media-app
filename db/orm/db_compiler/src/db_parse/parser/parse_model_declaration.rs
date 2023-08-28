// ---- std and file imports ----
//
use crate::schema::{ Rule, Pairs };
use crate::db_parse::ast::{ Model };
use crate::db_parse::parser::{ Schema };
//
// ---- t-t-t-that's it folks ----

// parses model columns and namespace
// public::User {
// ^^^^^^  ^^^^
// all this 
// 
//     id String
//     ^^ ^^^^^^
//     and this
//
//     ...the rest
// 

impl Schema {
    pub fn parse_model_declaration( &mut self, pairs: Pairs<'_, Rule> ) {

        // for each model/table create a hash map, so 
        // relations between them can be retreived 
        // easily later
        let mut model: Model = Model {
            model_declaration: None,
            columns:           Vec::new()
        };

        // this just matches namespaces and columns
        for pair in pairs {

            match pair.as_rule() {
                // namespace
                // 
                // public::User { ... }
                // ^^^^^^  ^^^^    
                // db      name
                //
                Rule::namespace     => {
                    model.model_declaration = self.parse_namespace( pair.into_inner() );
                },

                // email String    @validate; 
                // ^^^^^ ^^^^^^    ^^^^^^^^^ 
                // name  base_type directive(s)
                //
                // username String::unique();
                // ^^^^^^^^ ^^^^^^  ^^^^^^^^
                // -||-     -||-    function   
                //
                Rule::column        => { 
                    let new_column = self.parse_column( pair.into_inner() );
                    model.columns
                    .push( 
                        new_column.clone()
                    );
                },

                // not needed in compilation really, 
                // only here for syntax purposes.
                // 
                // but has to be included
                // 
                // public::User { ... }
                //              ^^   ^^
                // BLOCK OPEN AND CLOSE
                // 
                Rule::BLOCK_OPEN    => {}, 
                Rule::BLOCK_CLOSE   => {},
                
                // public::User { ... } // comment
                //                      ^^^^^^^^^^
                //                      comments and docs
                // 
                Rule::comment_block => {},
                // panic on unknown
                _ => panic!( "unknown model branch" )
            }
        }

        // insert into hashmap
        match model.clone().model_declaration {
            // if exists insert into hash map
            // with table name as key
            //
            // ie.
            // public::User { ... }
            // ^^^^^^^^^^^^^^^^^^^^
            // HashMap<"User", Model { ... }>
            //
            Some( d ) => {
                self.parsed_tables.insert( d.name, 
                                           model.clone() );
            },
            // panic if model_declaration is None
            // this will end the compilation process
            None      => { panic!( "table does not exist" ) }
        }
    }
}