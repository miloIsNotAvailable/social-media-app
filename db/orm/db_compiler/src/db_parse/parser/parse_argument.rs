// ---- std and file imports ----
//
use crate::schema::{ Rule, Pairs };
use crate::db_parse::ast::base_types::{ BaseTypeNames };
use crate::db_parse::ast::{ Argument };
use crate::db_parse::parser::{ Schema };
//
// ---- t-t-t-that's it folks ----

impl Schema {
    pub fn parse_argument( &self, pairs: Pairs<'_, Rule> ) -> Option<Argument> {

        let mut name: Option<String> = None;

        for pair in pairs {
            match pair.as_rule() {
                Rule::name => {
                    name = Some( pair
                                 .as_span()
                                 .as_str()
                                 .to_string() );
                }
                Rule::scope_resolution_operator => {},
                _ => panic!( "parsed stuff wrong: {:?}", pair.as_rule() )
            }
        }

        match name {
            Some( n ) => Some( Argument { name: n } ),
            None => None
        }
        
    }
}