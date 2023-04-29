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
        let mut pool = PgConnection::connect("postgres://postgres:Trzciano31A@db.mqifkoalnglfauiiliet.supabase.co:5432/postgres").await;    
        pool.ok()
    } 

    pub async fn get_sql_schema() -> Vec<QuerySqlSchema> {
        let schema = QueryTableData::query_data().await;
        schema
    }
}