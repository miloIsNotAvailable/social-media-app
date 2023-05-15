pub mod column_changes {
    
    use crate::sql_schema::sql_migrations::compare::compare_tables::{ Compare };
    use crate::create_sql_migration::Changes;
    use crate::sql_schema::sql_migrations::format_sql::FormatSql;
    use crate::sql_schema::sql_migrations::compare_column_types::column_types;

    use std::collections::HashMap;

    fn get_column_name( col: &sqlparser::ast::ColumnDef ) -> String {
        col.clone().name.value
    }

    impl Compare {

        pub fn compare_columns(
            registered_changes: &mut Vec<Changes>,
            table_sql: sqlparser::ast::Statement,
            table_schema: sqlparser::ast::Statement
        ) {
            let ( schema_table_chain, cols_schema ) = FormatSql::CreateTable::get_columns( &table_schema ).unwrap();
            let ( sql_table_chain, cols_sql ) = FormatSql::CreateTable::get_columns( &table_sql ).unwrap();

            let mut cache_schema = HashMap::<String, sqlparser::ast::ColumnDef>::new();
            let mut cache_sql = HashMap::<String, sqlparser::ast::ColumnDef>::new();

            let schema_columns_zipped: &Vec<(
                String, 
                sqlparser::ast::ColumnDef
            )> = &cols_schema
            .into_iter()
            .map( |ref column| {
                
                cache_schema.insert(
                    // one way to avoid partial moves
                    get_column_name( column ).to_lowercase(),
                    column.clone()
                );
                (
                    get_column_name( column ).to_lowercase(),
                    column.clone()
                )
            } ).rev().collect();

            let sql_columns_zipped: &Vec<(
                String, 
                sqlparser::ast::ColumnDef
            )> = &cols_sql
            .into_iter()
            .map( |ref column| {

                cache_sql.insert(
                    get_column_name( column ).to_lowercase(),
                    column.clone()
                );
                (
                    get_column_name( column ).to_lowercase(),
                    column.clone()
                )
            } ).rev().collect();

            for ( sql_col, sql_schema_iter ) in schema_columns_zipped {
                match cache_sql.get( sql_col ) {
                    Some( exists ) => {
                        Self::compare_column_types(
                            registered_changes,
                            schema_table_chain,
                            &sql_schema_iter,
                            &exists
                        );
                    },
                    None => {
                        // println!( "{:?}", sql_col );
                        registered_changes.push( 
                            Changes::AddColumn( 
                                schema_table_chain.clone(), 
                                sql_schema_iter.clone() 
                            ) 
                        );
                    }
                }
            }

            for ( sql_col, sql_schema_iter ) in sql_columns_zipped {
                match cache_schema.get( sql_col ) {
                    Some( exists ) => {},
                    None => {
                        registered_changes.push( 
                            Changes::DropColumn( 
                                schema_table_chain.clone(), 
                                sql_schema_iter.clone() 
                            ) 
                        );
                    }
                }
            }


        }   
    }
}