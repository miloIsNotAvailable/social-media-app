use sqlx::postgres::PgConnectOptions;
use sqlx::ConnectOptions;
use sqlx::PgConnection;
use sqlx::Connection;
use std::error::Error;

// use crate::sql_schema::parse_sql_schema::query_table_data;
use crate::sql_schema::query_sql_schema::query_table_data::QueryTableData::query_data;

// #[derive(sqlx::FromRow, Debug)]
// pub struct ParseSqlSchema {}

// impl ParseSqlSchema {
//     pub async fn connect() -> Option<PgConnection> {
//         let mut pool = PgConnection::connect("postgres://postgres:Trzciano31A@db.mqifkoalnglfauiiliet.supabase.co:5432/postgres").await;    
//         pool.ok()
//     } 
// }

#[tokio::main]
pub async fn main() {
    
    // let mut pool = ParseSqlSchema::connect().await;
    // match pool {
    //     Some( db ) => {
    //         let row = QueryTableData::query_sql_columns( 
    //             db, 
    //             "Item".to_string() 
    //         );
        
    //         println!( "{:?}", row.await );
    //     },
    //     _ => {}
    // }

    let rows = query_data().await;
    println!( "{:?}", rows );
    // let row = sqlx::query_as::<_, ParseSqlColumns>("SELECT * FROM information_schema.columns WHERE table_name ='Item';")
    // .bind("")
    // .fetch_all(&mut pool).await?;

    // Ok(())
}