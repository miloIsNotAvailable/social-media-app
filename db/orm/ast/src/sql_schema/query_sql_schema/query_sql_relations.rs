pub mod QuerySqlRelations {

    use crate::sql_schema::query_sql_schema::QuerySqlSchema;

    use sqlx::postgres::PgConnectOptions;
    use sqlx::ConnectOptions;
    use sqlx::PgConnection;
    use sqlx::Connection;
    use sqlx::postgres::{ PgRow };
    use sqlx::Row;

    #[derive(Debug)]
    pub struct QuerySqlRelation {
        conname: String,
        contype: String
    }

    impl sqlx::FromRow<'_, sqlx::postgres::PgRow> for QuerySqlRelation {
        fn from_row( row: &PgRow ) -> Result<Self, sqlx::Error> {
            
            let mut bytes: Vec<i8> = vec![];
            bytes.push( row.try_get( "contype" )? );
            
            Ok(
                Self {
                    conname: row.try_get( "conname" )?,
                    // convert i8 type to String type
                    contype: String::from_utf8(
                        bytes
                        .iter()
                        .map(|&c| c as u8).collect()
                    ).unwrap()
                }
            )
        }
    }

    impl QuerySqlRelation {
        pub async fn query_relation( table: String ) -> Option<Vec<QuerySqlRelation>> {
            let mut pool = QuerySqlSchema::connect().await;
            match pool {
                Some( db ) => {
                    let row = query_sql_relations( db, table );
                
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

    async fn query_sql_relations( 
        mut pool: PgConnection, 
        table_name: String 
    ) -> Result<Vec<QuerySqlRelation>, sqlx::Error> {
        
        let row = sqlx::query_as::<_, QuerySqlRelation>("SELECT con.*
        FROM pg_catalog.pg_constraint con
             INNER JOIN pg_catalog.pg_class rel
                        ON rel.oid = con.conrelid
             INNER JOIN pg_catalog.pg_namespace nsp
                        ON nsp.oid = connamespace
        WHERE nsp.nspname = 'public'
              AND rel.relname = $1;")
        .bind( table_name )
        .fetch_all(&mut pool).await;
    
        row
    }
}