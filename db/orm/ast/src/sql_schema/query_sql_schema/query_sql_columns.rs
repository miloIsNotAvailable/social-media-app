pub mod QuerySqlColumns {
    
    use crate::sql_schema::query_sql_schema::QuerySqlSchema;
    use crate::sql_schema::query_sql_schema::query_sql_relations::QuerySqlRelations::{ QuerySqlRelation };

    use sqlx::postgres::PgConnectOptions;
    use sqlx::ConnectOptions;
    use sqlx::PgConnection;
    use sqlx::Connection;

    #[derive(sqlx::FromRow, Debug)]
    pub struct QuerySqlColumn { 
        column_name: String, 
        column_default: Option<String>, 
        is_nullable: String, 
        data_type: String, 
        udt_name: String, 
    }

    impl QuerySqlColumn {
        pub async fn query_column( table: &String ) -> Option<Vec<QuerySqlColumn>> {
            let mut pool = QuerySqlSchema::connect().await;
            match pool {
                Some( db ) => {
                    let row = query_sql_columns( db, table.to_string() );

                    match row.await {
                        Ok( r ) => {
                            let e = QuerySqlRelation::query_relation( table.to_string() );
                            println!( "sfsf {:?}", e.await );
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