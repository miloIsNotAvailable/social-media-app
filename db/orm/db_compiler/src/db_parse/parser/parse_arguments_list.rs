// ---- std and file imports ----
//
use crate::schema::{ Rule, Pair };
use crate::db_parse::ast::{ BaseType, ArgumentsList };
use crate::db_parse::parser::{ Schema };
//
// ---- t-t-t-that's it folks ----

impl Schema {
    pub fn parse_arguments_list( &self, pairs: Pair<'_, Rule> ) -> ArgumentsList {

        let mut parsed_args_list: Vec<BaseType> = Vec::new();

        //
        // - arguments_list # you're here
        //     - base_type  # same as base_type
        //
        for pair in pairs.into_inner() {
            match pair.as_rule() {
                
                //
                // username String::length( 256 );
                //                          ^^^
                // id PrimaryKey<String>
                //              ^^^^^^^^
                //
                // post_id ForeignKey<String, User::id>;
                //                   ^^^^^^^^^^^^^^^^^^
                //
                Rule::base_type => { 
                    
                    // - base_type  # you're here
                    //    - ...     # base_type args 
                    //
                    parsed_args_list.push( 
                        self.parse_base_type( 
                            pair
                            .into_inner()
                        ) 
                    ); 
                },
                // used for syntax only
                //
                // username Vec<String>;
                //             ^^    ^^
                Rule::TYPE_OPEN => {},
                Rule::TYPE_CLOSE => {},
                _ => println!( "{:?}", pair.as_rule() )
            }
        }

        ArgumentsList { base_type: parsed_args_list }
    }
}