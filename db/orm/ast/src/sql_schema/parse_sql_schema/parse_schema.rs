use sqlx::postgres::PgConnectOptions;
use sqlx::ConnectOptions;
use sqlx::PgConnection;
use sqlx::Connection;
use std::error::Error;

use crate::sql_schema::parse_sql_schema::Schema;
use crate::sql_schema::query_sql_schema::QuerySqlSchema;
use crate::sql_schema::parse_sql_schema::parse_table_name;
use crate::sql_schema::parse_sql_schema::parse_columns;

#[tokio::main]
pub async fn main() {

    let schema = QuerySqlSchema::get_sql_schema().await;
    
    for table in schema {
        let mut cols: Vec<String> = vec![];
        let schemaTable = Schema::Constraints( table.constraints ).constraints();
        // println!( "{:?}", schemaTable );
    }
}