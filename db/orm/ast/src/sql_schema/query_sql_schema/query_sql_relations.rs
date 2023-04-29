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
        pub constraint_name: String,
        pub constraint_type: String,
        pub column_name: String,
        pub foreign_key_name: String,
        // pub parent: String,
        pub table_name: Option<String>
    }

    impl sqlx::FromRow<'_, sqlx::postgres::PgRow> for QuerySqlRelation {
        fn from_row( row: &PgRow ) -> Result<Self, sqlx::Error> {
            
            let mut table_name: Option<String> = None;

            let t_name: String = row.try_get( "table_name" )?;
            let parent: String = row.try_get( "parent" )?;

            if t_name != parent {
                table_name = Some( t_name );
            }

            Ok(
                Self {
                    constraint_name: row.try_get( "constraint_name" )?,
                    column_name: row.try_get( "column_name" )?,
                    constraint_type: row.try_get( "constraint_type" )?,
                    foreign_key_name: row.try_get( "foreign_key_name" )?,
                    table_name: table_name,
                }
            )
        }
    }

    impl QuerySqlRelation {
        pub async fn query_relation( table: &String ) -> Option<Vec<QuerySqlRelation>> {
            let mut pool = QuerySqlSchema::connect().await;
            match pool {
                Some( db ) => {
                    let row = query_sql_relations( db, table.to_string() );
                
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
        
        let row = sqlx::query_as::<_, QuerySqlRelation>("SELECT
        tc.constraint_name, 
        tc.constraint_type, 
        kcu.table_name as parent, 
        ccu.table_name, 
        kcu.column_name,
        ccu.column_name as foreign_key_name
        FROM 
        information_schema.table_constraints AS tc 
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE tc.table_name=$1;")
        .bind( table_name )
        .fetch_all(&mut pool).await;
    
        row
    }
}