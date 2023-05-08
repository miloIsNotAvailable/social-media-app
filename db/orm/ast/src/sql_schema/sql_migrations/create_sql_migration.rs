#![allow(non_snake_case)]

// extern crate sqlparser; 
use crate::sql_schema::parse_sql_schema::parse_schema;
use crate::parse_field_type::parse::{ FieldType, FieldAttrType };
use crate::parse_base_type::parse::{ BaseType };
use crate::parse_expression::parse::{ Expr, Argument, Arguments };
use crate::sql_schema::sql_migrations::parse_schema_types::SchemaTypes;
use crate::sql_schema::sql_migrations::format_sql::FormatSql;
use crate::sql_schema::sql_migrations::compare::compare_tables;
use crate::sql_schema::sql_migrations::compare_column_types::column_types;

use std::fs::File;
use std::io::prelude::*;
use sqlparser::dialect::GenericDialect;
use sqlparser::parser::Parser;
use sqlparser::tokenizer::Tokenizer;
use std::fmt;

pub fn generate_sql_file() {
    parse_schema::main();
    println!( "SQL migration file generated" );
}

fn load_file() -> std::io::Result<String>{ 
    let mut file = File::open("sql_db_migration.sql")?;
    let mut contents = String::new();
   
    file.read_to_string(&mut contents);   

    Ok( contents )
}

#[derive(Debug)]
pub enum Changes {
    CreateTable( sqlparser::ast::Statement ),
    RenameTable( sqlparser::ast::Statement ),
    // whole table, altered column 
    DropColumn( sqlparser::ast::Statement, sqlparser::ast::ColumnDef ),
    AddColumn( sqlparser::ast::Statement, sqlparser::ast::ColumnDef ),
    AlterColumnType( 
        sqlparser::ast::Statement, 
        sqlparser::ast::ColumnDef, 
        // schema data type
        sqlparser::ast::DataType, 
        // sql data type in case you have to
        // use USING [column]::[sql-type] to alter type
        sqlparser::ast::DataType 
    ),
    AlterColumnOption( 
        sqlparser::ast::Statement, 
        sqlparser::ast::ColumnDef, 
        column_types::SetOption 
    ),
    AddConstraint( sqlparser::ast::Statement, sqlparser::ast::ColumnDef ),
    DropConstraint( sqlparser::ast::Statement, sqlparser::ast::ColumnDef ),
    DropTable( sqlparser::ast::Statement ),
}

impl fmt::Display for Changes {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::CreateTable( table ) => write!( 
                f, "{}", 
                format!( "{}", table ) 
            ),
            Self::DropTable( table ) => {
                let table_name = FormatSql::CreateTable::get_name( 
                    table.clone() 
                ).unwrap();

                write!( f, "drop table public.{}", table_name )
            },
            Self::DropColumn( table, col ) => {
                let table_name = FormatSql::CreateTable::get_name( 
                    table.clone() 
                ).unwrap();

                write!( 
                    f, "alter table public.{} drop column {}", 
                    table_name,
                    col.name
                )
            },
            Self::AddColumn( table, col ) => {
                let table_name = FormatSql::CreateTable::get_name( 
                    table.clone() 
                ).unwrap();

                write!( 
                    f, "alter table public.{} add column {}", 
                    table_name,
                    format!( "{col}" )
                )
            },
            Self::AlterColumnType( table, col, schema_d_type, sql_d_type ) => {
                let table_name = FormatSql::CreateTable::get_name( 
                    table.clone() 
                ).unwrap();

                write!( 
                    f, "alter table public.{} alter column {} type {} using {}::{}", 
                    table_name,
                    col.name,
                    format!( "{}", schema_d_type ),
                    col.name,
                    format!( "{}", schema_d_type )
                )
            },
            Self::AlterColumnOption( 
                table, 
                col, 
                option 
            ) => {
                let table_name = FormatSql::CreateTable::get_name( 
                    table.clone() 
                ).unwrap();

                write!( 
                    f, "alter table public.{} alter column {} {}", 
                    table_name,
                    col.name,
                    format!( "{option}" ),
                )
            },
            _ => write!( f, "hey" )
        }
    }
}

pub fn compare_files( to_compare: String ) -> Result<String, ()> {
    
    let dialect = GenericDialect {};  

    let file = load_file();
    let mut compare = compare_tables::Compare { registered_changes: vec![] };

    match file {
        Ok( file_ ) => {

            let ast_file = Parser::parse_sql(&dialect, &file_).unwrap();
            let ast_compare = Parser::parse_sql(&dialect, &to_compare).unwrap();

            // println!( "{:?} {:?}", schema_tables, sql_tables );

            compare.compare_tables( &ast_file, &ast_compare );
            
            let mut joins: Vec<String> = vec![];

            for change in compare.registered_changes {
                joins.push( format!( "{change}" ) );
            }

            Ok(format!( "{};", joins.join( ";\n" ) ))
        },
        Err( err ) => {
            Err(println!( "error" ))
        }
    }
}

// #[derive(Debug)]
// pub enum CompileObjName<'a> {
//     ObjName( &'a ObjectName,  )
// }

// #[derive(Debug)]
// pub enum CompileIdentVec<'a> {
//     ObjName( &'a Vec<Ident>,  )
// }

// impl fmt::Display for CompileIdentVec<'_> {
//     fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        
//         let mut vecs: Vec<&str> = vec![];

//         match self {
//             CompileIdentVec::ObjName( obj_name ) => {
//                 let v: Vec<&str> = obj_name.into_iter().map( 
//                     |ident| ident.value .as_str()
//                 ).rev().collect();

//                 vecs = v;
//             },
//             _ => {}
//         }

//         let mut joined = vecs.join( "," );
//         joined = joined.replace( "\"", "" );

//         write!(f, "{joined:?}" )
//     }
// }

// impl fmt::Display for CompileObjName<'_> {
//     fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        
//         let mut vecs: Vec<&str> = vec![];

//         match self {
//             CompileObjName::ObjName( obj_name ) => {
//                 match obj_name {
//                     ObjectName( idents ) => {
//                         let v: Vec<&str> = idents.into_iter().map( 
//                             |ident| ident.value.as_str() 
//                         ).rev().collect();

//                         vecs = v;
//                     }
//                 }
//             },
//             _ => {}
//         }

//         let mut joined = vecs.join( "," );
//         joined = joined.replace( "\"", "" );

//         write!(f, "{:?}", joined)
//     }
// }

// impl core::convert::From<&ColumnDef> for FieldType {
//     fn from( column: &ColumnDef ) -> FieldType {

//         let mut attr: Vec<FieldAttrType> = vec![];

//         let field_attr = SchemaTypes::match_col_opts( column.clone() );

//         match field_attr {
//             Some( a ) => attr.push( a ),
//             _ => {}
//         }

//         FieldType { 
//             name: column.name.value.to_string(),
//             field: SchemaTypes::parse_to_base_type( &column ),
//             attributes: attr
//         }
//     }
// }

// #[derive(Debug)]
// pub struct ParseTable {}

// impl ParseTable {
//     pub fn parse_model_name( obj_enum: Vec<ColumnDef> ) {

//         for obj in obj_enum {
//             // println!( "{:?}\n", FieldType::from( &obj ) );
//             // println!( "{:?}\n", obj );
//         }
//     }

//     pub fn parse_model_constraints( table: Statement ) {
//         let Statement::CreateTable { ref columns, constraints, .. } = table else { todo!() };
        
//         let mut attr_path: Option<String> = None;
//         let mut relation: Option<FieldAttrType> = None;

//         for c in constraints {
//             match c {
//                 sqlparser::ast::TableConstraint::Unique { name, is_primary, .. } => {
                    
//                     match is_primary {
//                         true => attr_path = Some( "id".to_string() ),
//                         false => attr_path = Some( "unique".to_string() ),
//                         _ => {}
//                     }
//                 },
//                 sqlparser::ast::TableConstraint::ForeignKey { name, referred_columns, foreign_table, columns, .. } => {
                    
//                     let foreign_t = CompileObjName::ObjName::<'_>( &foreign_table );
//                     let cols = CompileIdentVec::ObjName::<'_>( &columns );
//                     let foreign_cols = CompileIdentVec::ObjName::<'_>( &referred_columns );
                    
//                     // println!( "{:?}", format!( "@relation( fields:[{cols}] references:[{foreign_cols}]" ) );
//                     relation = Some(FieldAttrType {
//                         path: "relation".to_string(),
//                         arguments_list: Arguments {
//                             arguments_list: [
//                                 Argument {
//                                     identifier: Some( Expr::ConstantValue( String::from("fields") ) ),
//                                     expression: Expr::Arr( [Expr::ConstantValue( format!( "{cols}" ) )].to_vec() )
//                                 },
//                                 Argument {
//                                     identifier: Some( Expr::ConstantValue( String::from("references") ) ),
//                                     expression: Expr::Arr( [Expr::ConstantValue( format!( "{foreign_cols}" ) )].to_vec() )
//                                 }
//                             ].to_vec()
//                         }
//                     });

//                     // println!( "{:?}", e );
//                 },
//                 _ => {}
//             }
//         }
        
//         for column in columns {

//             let mut attr: Vec<FieldAttrType> = vec![];
    
//             let field_attr = SchemaTypes::match_col_opts( column.clone() );
    
//             match field_attr {
//                 Some( a ) => attr.push( a ),
//                 _ => {}
//             }

//             // match relation {
//             //     Some( r ) => attr.push( r ),
//             //     _ => {}
//             // }
    
//             let e = FieldType { 
//                 name: column.name.value.to_string(),
//                 field: SchemaTypes::parse_to_base_type( &column ),
//                 attributes: attr
//             };
            
//             // println!( "{:?}", e );
//         }
//     }
// }

// pub fn parse_sql_file() -> std::io::Result<()> {
    
//     let dialect = GenericDialect {};

//     let mut file = File::open("sql_db.sql")?;
//     let mut contents = String::new();    
//     file.read_to_string(&mut contents)?;

//     let ast = Parser::parse_sql(&dialect, &contents).unwrap();

//     for table in ast {
//         // let Statement::CreateTable { ref columns, ref constraints, .. } = table else { todo!() };
//         // ParseTable::parse_model_name( columns.to_vec() );
//         ParseTable::parse_model_constraints( table );
//         // println!( "{:?}\n", constraints );
//     }

//     Ok( () )
// }