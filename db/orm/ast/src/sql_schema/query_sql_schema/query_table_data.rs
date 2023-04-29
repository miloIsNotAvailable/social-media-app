pub mod QueryTableData {
    
    use crate::sql_schema::query_sql_schema::QuerySqlSchema;
    use crate::sql_schema::query_sql_schema::query_table_names::QueryTableNames::{ QueryTableName };
    use crate::sql_schema::query_sql_schema::query_sql_columns::QuerySqlColumns::{ QuerySqlColumn };

    use sqlx::postgres::PgConnectOptions;
    use sqlx::ConnectOptions;
    use sqlx::PgConnection;
    use sqlx::Connection;
    use std::future::Future;

    pub async fn query_data() {
        
        let tables = QueryTableName::query_sql_tables().await;
        
        match tables {
            Some( table_names ) => {
                // println!( "{:?}", table_names );
                for table in table_names {

                    let columns = QuerySqlColumn::query_column( &table.table_name ).await;
                    match columns {
                        Some( col ) => {
                            println!( "{:?}", col );
                        },
                        _ => {}
                    }
                }
            },
            _ => {}
        }
    }
}