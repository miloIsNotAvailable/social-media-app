pub mod query_table_data;
pub mod query_table_names;
pub mod query_sql_columns;
pub mod query_sql_relations;

use sqlx::postgres::PgConnectOptions;
use sqlx::ConnectOptions;
use sqlx::PgConnection;
use sqlx::Connection;
use std::error::Error;

#[derive(sqlx::FromRow, Debug)]
pub struct QuerySqlSchema {}

impl QuerySqlSchema {
    pub async fn connect() -> Option<PgConnection> {
        let mut pool = PgConnection::connect("postgres://postgres:Trzciano31A@db.mqifkoalnglfauiiliet.supabase.co:5432/postgres").await;    
        pool.ok()
    } 
}