// ---- std and file imports ----
//
use crate::schema::{ Rule, Pairs };
use crate::db_parse::ast::{ Function };
use crate::db_parse::parser::{ Schema };
//
// ---- t-t-t-that's it folks ----

impl Schema {
    pub fn parse_function( &self, pairs: Pairs<'_, Rule> ) -> Function {

        let mut parsed_function: Function = Function {
            name:           None,
            arguments_list: None,
        };

        // 
        // - function           # you're here
        //     - name           # function name
        //     - arguments_list # arguments list
        //
        for pair in pairs {
            //
            // - name # you're here
            // - ...
            //
            // id PrimaryKey<String>::uuidv4();
            //                        ^^^^^^^^
            //
            // username String::length( 256 );
            //                  ^^^^^^^^^^^^^
            //
            match pair.as_rule() {
                
                //
                // username String::length( 256 );
                //                  ^^^^^^
                //
                // name String::unique();
                //              ^^^^^^
                //
                Rule::name => { 
                    parsed_function.name = Some( 
                        pair.as_span().as_str().to_string() 
                    );
                },
                
                //
                // username String::length( 256 );
                //                          ^^^
                //
                Rule::arguments_list => { 
                    parsed_function.arguments_list = Some( 
                        self.parse_arguments_list(
                            pair
                        )
                    );
                },
                
                // not needed in parsing
                // username String::length( 256 );
                //                ^^
                //
                Rule::scope_resolution_operator => {},
                _ => panic!()
            }
        }

        // println!( "{:?}", parsed_function );
        parsed_function
    }
}