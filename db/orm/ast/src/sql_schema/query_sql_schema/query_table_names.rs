pub mod QueryTableNames {
    
    use sqlx::postgres::PgConnectOptions;
    use sqlx::ConnectOptions;
    use sqlx::PgConnection;
    use sqlx::Connection;
    use crate::sql_schema::query_sql_schema::QuerySqlSchema;
    use std::future::Future;

    #[derive(sqlx::FromRow, Debug)]
    pub struct QueryTableName {
        pub table_name: String
    }

    impl QueryTableName {
        // facade for the query_sql_tables function
        pub async fn query_sql_tables() -> Option<Vec<QueryTableName>> {
            let mut pool = QuerySqlSchema::connect().await;

            match pool {
                Some( db ) => {
                    let row = query_sql_tables( db );
                
                    match row.await {
                        Ok( r ) => Some( r ),
                        Err( e ) => {
                            println!( "{:?}", e );
                            None
                        }
                    }
                },
                _ => { None }
            }
        }
    }

    // return all table names from public schema
    pub async fn query_sql_tables( 
        mut pool: PgConnection 
    ) -> Result<Vec<QueryTableName>, sqlx::Error> {
        
        let row = sqlx::query_as::<_, QueryTableName>("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
        .bind( "" )
        .fetch_all(&mut pool).await;
    
        row
    }
}