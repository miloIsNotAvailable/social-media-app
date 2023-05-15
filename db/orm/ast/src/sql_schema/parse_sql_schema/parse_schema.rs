use sqlx::postgres::PgConnectOptions;
use sqlx::ConnectOptions;
use sqlx::PgConnection;
use sqlx::Connection;
use std::fs::File;
use std::io::prelude::*;
use std::fs::OpenOptions;

use crate::sql_schema::parse_sql_schema::Schema;
use crate::sql_schema::query_sql_schema::QuerySqlSchema;
use crate::sql_schema::parse_sql_schema::parse_table_name;
use crate::sql_schema::parse_sql_schema::parse_columns;
use crate::parse_schema as schema_parser;
use crate::sql_schema::sql_migrations::create_sql_migration;
use crate::parse_schema::parse_schema_model::parse_model_schema::parse_model;
use crate::parse_schema::schema::{IdentParser, Rule, Parser};

#[tokio::main]
pub async fn main() -> std::io::Result<()> {

    let schema = QuerySqlSchema::get_sql_schema().await;

    let mut schema_parsed: Vec<String> = vec![];
    let mut file = File::create( "sql_db_migration.sql" )?;

    for table in schema {
        let schema_table = Schema::columns_parsed( table );
        schema_parsed.push( schema_table );
        // println!( "{:?}", schemaTable );
    }

    file.write_all( schema_parsed.join( "\n\n" ).as_str().as_bytes() )?;
    
    let mut file = File::open("schema.prisma")?;
    let mut contents = String::new();    
    file.read_to_string(&mut contents)?;

    let pairs = IdentParser::parse(Rule::schema, &contents).unwrap_or_else(|e| panic!("{}", e));

    let mut schema_parsed: Vec<String> = vec![];
    let mut get_classes_vec: Vec<String> = vec![];
    // let mut file = File::create( "sql_db.sql" )?;
    // let mut schema_as_sql: String = "".to_string();

    for inner in pairs {

        for pair in inner.into_inner() {
            match pair.as_rule() {
                Rule::model_declaration => {
                    let e = parse_model( pair.into_inner() );
                    
                    let schema_as_sql = format!( "{}(\n{}\n);", e.name, e.fields );
                    schema_parsed.push( schema_as_sql );
                },
                _ => {}
            }
        }
    }

    match schema_parser::schema::parse_schema( "schema.prisma" ) {
        Ok( ( 
            uuids, 
            schema__, 
            ts_types, 
            ts_get_classes 
        ) ) => {
            
            println!( "{}", schema__ );

            let migration = create_sql_migration::compare_files( schema__ );
            match &migration {
                Ok( m ) => {
                    
                    // let mut new_m: Vec<String> = vec![];
                    // new_m.append( m );

                    // weird trick, but
                    // to execute queyr I have to split 
                    // above functions because you
                    // can execute only one statement at a time 
                    m.clone().append( &mut uuids
                        .split( "-- split" )
                        .map( |x| x.to_string() )
                        .collect::<Vec<String>>() 
                    );
                    
                    let mut m_rev = m.clone()
                    .into_iter()
                    .rev().collect();

                    // println!( "{}", m );
                    QuerySqlSchema::exec( 
                        m_rev
                    ).await;

                    let mut sql_db_file = OpenOptions::new()
                    .write(true)
                    .append(true)
                    .open("sql_db_migration_tracker.sql");
                    
                    let m_ = format!( "{};", m.clone()
                    .into_iter()
                    .rev()
                    .collect::<Vec<String>>()
                    .join( ";\n" ) );

                    match sql_db_file {
                        Ok( mut sql_db_f ) => {
                            writeln!( sql_db_f, "\n{}\n", m_ );
                        },
                        Err( err ) => {
                            let mut file = File::create( "sql_db_migration_tracker.sql" )?;
                            file.write_all( m_.as_str().as_bytes() )?;
                        }
                    }
                },
                Err( err ) => println!( "error" ),
            }

            get_classes_vec.push( format!( "\t{}", ts_get_classes ) );

            let mut ts_file = File::create( "types.ts" )?;
            ts_file.write_all( ts_types.as_str().as_bytes() )?;
        },
        Err( _ ) => {}
    }
    
    let wrap_classes = format!( "import Query from './Queries/Query'\nimport * as Types from '../orm/ast/types'\n\nexport class Generated {{\n{}\n}}", 
        get_classes_vec.join( "\n\n" ) 
    );

    let mut ts_generated_class_file = File::create( "../generated.ts" )?;
    ts_generated_class_file.write_all( wrap_classes.as_str().as_bytes() )?;
    
    Ok(())
}