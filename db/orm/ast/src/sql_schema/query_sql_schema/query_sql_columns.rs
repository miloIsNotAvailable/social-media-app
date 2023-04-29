pub mod QuerySqlColumns {
    
    use crate::sql_schema::query_sql_schema::QuerySqlSchema;

    use sqlx::postgres::PgConnectOptions;
    use sqlx::ConnectOptions;
    use sqlx::PgConnection;
    use sqlx::Connection;
    use sqlx::postgres::{ PgRow };
    use sqlx::Row;

    #[derive(sqlx::FromRow, Debug)]
    pub struct QuerySqlColumn { 
        pub column_name: String, 
        pub column_default: Option<String>, 
        pub is_nullable: String, 
        pub data_type: String, 
        pub udt_name: String, 
    }

    impl QuerySqlColumn {
        pub async fn query_column( table: &String ) -> Option<Vec<QuerySqlColumn>> {
            let mut pool = QuerySqlSchema::connect().await;
            match pool {
                Some( db ) => {
                    let row = query_sql_columns( db, table.to_string() );

                    match row.await {
                        Ok( r ) => {
                            Some( r )
                        },
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

    async fn query_sql_columns( 
        mut pool: PgConnection, 
        table_name: String 
    ) -> Result<Vec<QuerySqlColumn>, sqlx::Error> {
        
        let row = sqlx::query_as::<_, QuerySqlColumn>("SELECT * FROM information_schema.columns WHERE table_name = $1;")
        .bind( table_name )
        .fetch_all(&mut pool).await;
    
        row
    }
    
}