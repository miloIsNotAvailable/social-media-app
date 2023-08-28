// ---- std and file imports ----
//
use crate::schema::{ Rule, Pairs };
use crate::db_parse::ast::base_types::{ BaseTypeNames };
use crate::db_parse::ast::{ BaseType };
use crate::db_parse::parser::{ Schema };
//
// ---- t-t-t-that's it folks ----

impl Schema {
    
    // compiles base types:
    //
    // username String;
    //          ^^^^^^
    //
    // username String::length( 256 );
    //          ^^^^^^^^^^^^^^^^^^^^^
    //
    // id PrimaryKey<String>;
    //    ^^^^^^^^^^^^^^^^^^
    //
    pub fn parse_base_type( &self, pairs: Pairs<'_, Rule> ) -> BaseType {

        let mut parsed_base_type = BaseType {
            name:     BaseTypeNames::Custom( String::from( "unknown" ) ),
            generic:  None,
            function: None,
            argument: None
        };

        //
        // - base_type     # you're here
        //     - name      # type name
        //     - generic   # optional type generic
        //     - function  # optional type function
        //

        for pair in pairs {
            // - name          # you're here
            // - ...
            
            match pair.as_rule() {
                //
                // username String::length( 10 );
                //          ^^^^^^
                //
                Rule::name     => { 
                    parsed_base_type.name = BaseTypeNames::map_types( 
                        pair.as_span().as_str().to_string() 
                    );
                },

                //
                // username String::length( 10 );
                //                  ^^^^^^^^^^^^
                //
                Rule::function => {},

                // generic is just a base_type
                //
                // username Vec<String>;
                //              ^^^^^^
                //
                Rule::generic  => { 
                    
                    //
                    // - generic          # you're here
                    //     - TYPE_OPEN    # type close "<"
                    //     - base_type    # base type repeats
                    //     - TYPE_CLOSE   # type close ">"
                    // - ...              # other properties
                    //
                    parsed_base_type.generic = Some(
                        
                        //
                        // - base_type    # you're here
                        // - ...
                        //
                        Box::new( self.parse_base_type( pair.into_inner() ) )
                    );
                },
                
                // used for syntax only
                //
                // username Vec<String>;
                //             ^^    ^^
                Rule::TYPE_OPEN => {},
                Rule::TYPE_CLOSE => {},



                // panic on unknown type 
                // and end compilation
                _ => println!( "hello" )
            }
        }

        parsed_base_type
    }
}
