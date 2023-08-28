// ---- std and file imports ----
//
use crate::schema::{ Rule, Pairs };
use crate::db_parse::ast::{ Column };
use crate::db_parse::parser::{ Schema };
//
// ---- t-t-t-that's it folks ----

impl Schema {
    pub fn parse_column( &self, pairs: Pairs<'_, Rule> ) -> Column {

        let mut parsed_column = Column {
            name:       None,
            base_type:  None,
            directives: None,
        };
    
        //
        // - column               # you're here
        //     - name: "..."      # column name
        //     - base_type: "..." # column type
        //     - directive: "..." # directive
        // - ...
        //
        for pair in pairs {
            
            // 
            // - name: "..." # you're here
            // - ...
            //
    
            match pair.as_rule() {
                //
                // username String::unique();
                // ^^^^^^^^ 
                //   name
                //
                Rule::name      => { 
                    parsed_column.name = Some(pair.as_span().as_str().to_string()) 
                    
                },
                
                //
                // username String::unique();
                //          ^^^^^^  
                //           type
                //
                // posts Vec<Posts>;
                //           ^^^^^
                //    generic, also a type
                // 
                // posts Vec<Posts>;
                //       ^^^^^^^^^^
                //
                Rule::base_type => { 
                    parsed_column.base_type = Some(
                        self.parse_base_type( pair.into_inner() )
                    ) 
                },
    
                // directives run before the insert 
                // and select queries
                // --------------------------------
                //
                // email String @validate;
                //              ^^^^^^^^^
                //
                // email String @has( "@gmail.com" );
                //              ^^^^^^^^^^^^^^^^^^^^
                //
                Rule::directive => {},
    
                // syntax sign, not needed in compilation
                //
                // email String @validate;
                //                       ^
                //                      this
                //
                Rule::COLUMN_END => {},
                _ => panic!()
            }
        }
    
        parsed_column.clone()
    }
}