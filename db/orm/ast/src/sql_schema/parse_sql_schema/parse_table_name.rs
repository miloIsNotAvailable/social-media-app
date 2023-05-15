pub mod ParseTableName {

    use std::fmt;
    
    use crate::sql_schema::parse_sql_schema::Schema;

    impl fmt::Display for Schema {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            match self {
                Schema::Table( val ) => write!( f, "{}", val.table_name ),
                _ =>  todo!()
            }
        }
    }

    impl Schema {
        pub fn table( &self ) -> String {
            match self {
                Schema::Table( val ) => {

                    let v = val.table_name.as_str().replace( '"', "sdfsf" );

                    format!( "create table if not exists public.{v}" )
                },
                _ => todo!()
            }
        }
    }
}