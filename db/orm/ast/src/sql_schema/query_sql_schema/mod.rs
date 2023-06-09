pub mod query_table_data;
pub mod query_table_names;
pub mod query_sql_columns;
pub mod query_sql_relations;

use sqlx::postgres::PgConnectOptions;
use sqlx::ConnectOptions;
use sqlx::PgConnection;
use sqlx::Connection;
use std::error::Error;

use crate::sql_schema::query_sql_schema::query_table_data::QueryTableData;
use crate::sql_schema::query_sql_schema::query_table_names::QueryTableNames::{ QueryTableName };
use crate::sql_schema::query_sql_schema::query_sql_columns::QuerySqlColumns::{ QuerySqlColumn };
use crate::sql_schema::query_sql_schema::query_sql_relations::QuerySqlRelations::{ QuerySqlRelation };

#[derive(sqlx::FromRow, Debug)]
pub struct QuerySqlSchema {
    pub table: QueryTableName,
    pub columns: Vec<QuerySqlColumn>,
    pub constraints: Vec<QuerySqlRelation>
}

impl QuerySqlSchema {
    pub async fn connect() -> Option<PgConnection> {
        let mut pool = PgConnection::connect("postgresql://postgres:Trzciano31A@db.pwfvdtvduwysiswsbyio.supabase.co:5432/postgres").await;    
        pool.ok()
    } 

    pub async fn get_sql_schema() -> Vec<QuerySqlSchema> {
        let schema = QueryTableData::query_data().await;
        schema
    }

    pub async fn exec(  query: Vec<String> ) {
        let mut pool = QuerySqlSchema::connect().await;
        
        println!( "running queries" );

        match pool {
            Some( mut db ) => {

                // let e = sqlx::query( 
                //     &format!( "{uuids}" ) 
                // );

                for q in query {

                    println!( "{q}" );

                    let e = sqlx::query( 
                        &format!( "{q}" ) 
                    )
                    .execute( &mut db ).await;
                 
                    match e {
                        Ok( succ ) => println!( "success" ),
                        Err( err ) => println!( "error {:?}", err ),
                    }
                }                
            },
            None => {  println!( "error" ); }
        }
        
    }
}