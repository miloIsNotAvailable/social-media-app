pub mod compare_tables {
  
    use std::collections::HashMap;
    use crate::sql_schema::sql_migrations::format_sql::FormatSql;
    use crate::create_sql_migration::Changes;
    use crate::sql_schema::sql_migrations::compare_column_changes::column_changes;

    #[derive(Debug)]
    pub struct Compare {
        pub registered_changes: Vec<Changes>
    }

    // if only names changes rename table,
    // if at least one column and names don't
    // match create new table
    impl Compare {

        pub fn compare_tables( 
            &mut self,
            tables_names_sql: &Vec<sqlparser::ast::Statement>, 
            tables_names_schema: &Vec<sqlparser::ast::Statement>, 
        ) {
    
            let mut cache_schema = HashMap::<Option<String>, sqlparser::ast::Statement>::new();
            let mut cache_sql = HashMap::<Option<String>, sqlparser::ast::Statement>::new();
    
            let schema_tables: &Vec<(
                Option<String>, 
                sqlparser::ast::Statement
            )> = &tables_names_schema
            .into_iter()
            .map( |name| {
    
                cache_schema.insert(
                    FormatSql::CreateTable::get_name( name.clone() ),
                    name.clone()
                );
                (
                    FormatSql::CreateTable::get_name( name.clone() ),
                    name.clone()
                )
            }
            )
            .rev().collect();
    
            let sql_tables: &Vec<(
                Option<String>, 
                sqlparser::ast::Statement
            )> = &tables_names_sql
            .into_iter()
            .map( |name| {
                cache_sql.insert(
                    FormatSql::CreateTable::get_name( name.clone() ),
                    name.clone()
                );
                (
                    FormatSql::CreateTable::get_name( name.clone() ),
                    name.clone()
                )
            }
            )
            .rev().collect();
    
            // check for added tables
            for ( sql_table, sql_schema_iter ) in schema_tables {
                // check for table in sql cache
                match cache_sql.get( sql_table ) {
                    // do nothing on match 
                    Some( exists ) => {
                        Self::compare_columns( 
                            &mut self.registered_changes,
                            exists.clone(), 
                            sql_schema_iter.clone()
                        );
                    },
                    // add to changes if there's
                    // a table not registered in cache
                    None => {
                        self.registered_changes.push( 
                            Changes::CreateTable( sql_schema_iter.clone() ) 
                        );
                    }
                }
            }
    
            // check for removed tables
            for ( sql_table, sql_schema_iter ) in sql_tables {
                match cache_schema.get( sql_table ) {
                    Some( exists ) => {},
                    None => {
                        self.registered_changes.push( 
                            Changes::DropTable( sql_schema_iter.clone() ) 
                        );
                    }
                }
            }
        }
    }
}