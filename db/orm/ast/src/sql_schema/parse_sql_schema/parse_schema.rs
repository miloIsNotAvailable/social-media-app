use sqlx::postgres::PgConnectOptions;
use sqlx::ConnectOptions;
use sqlx::PgConnection;
use sqlx::Connection;
use std::fs::File;
use std::io::prelude::*;

use crate::sql_schema::parse_sql_schema::Schema;
use crate::sql_schema::query_sql_schema::QuerySqlSchema;
use crate::sql_schema::parse_sql_schema::parse_table_name;
use crate::sql_schema::parse_sql_schema::parse_columns;

#[tokio::main]
pub async fn main() -> std::io::Result<()> {

    let schema = QuerySqlSchema::get_sql_schema().await;

    let mut schema_parsed: Vec<String> = vec![];
    let mut file = File::create( "sql_db.sql" )?;

    for table in schema {
        let schema_table = Schema::columns_parsed( table );
        schema_parsed.push( schema_table );
        // println!( "{:?}", schemaTable );
    }

    file.write_all( schema_parsed.join( "\n\n" ).as_str().as_bytes() )?;
    Ok(())
}