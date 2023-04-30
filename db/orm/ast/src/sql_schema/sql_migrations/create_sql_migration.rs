// extern crate sqlparser; 
use crate::sql_schema::parse_sql_schema::parse_schema;
use crate::parse_field_type::parse::{ FieldType, FieldAttrType };
use crate::parse_base_type::parse::{ BaseType };
use crate::parse_expression::parse::{ Expr, Argument, Arguments };
use crate::sql_schema::sql_migrations::parse_schema_types::SchemaTypes;

use std::fs::File;
use std::io::prelude::*;
use sqlparser::dialect::GenericDialect;
use sqlparser::parser::Parser;
use sqlparser::tokenizer::Tokenizer;
use sqlparser::ast::{ Ident, ObjectName, Statement, ColumnDef, DataType };
use std::fmt;

pub fn generate_sql_file() {
    parse_schema::main();
    println!( "SQL migration file generated" );
}

#[derive(Debug)]
pub struct Arg {
    val: String
}

//ColumnDef { 
    // name: Ident { value: "id", quote_style: None }, 
    // data_type: CharacterVarying(Some(CharacterLength { length: 36, unit: None })), 
    // collation: None, 
    // options: [ColumnOptionDef { name: None, option: NotNull }] 
// }

impl core::convert::From<&ColumnDef> for FieldType {
    fn from( column: &ColumnDef ) -> FieldType {
        
        // let mut d_type: Option<String> = None;
        // let mut d_attr: Option<String> = None;
        // let mut d_arg_list: Option<u64> = None;

        let mut attr: Vec<FieldAttrType> = vec![];
        let mut arg: Vec<Argument> = vec![];

        // let mut d_type = SchemaTypes::parse_types( &column.data_type );
        // SchemaTypes::match_col_opts( &column.options );

        arg.push( Argument {
            identifier: Some(Expr::ConstantValue( "".to_string() )),
            expression: Expr::ConstantValue( "".to_string() )
        } );

        attr.push(
            FieldAttrType {
                path: "".to_string(),
                arguments_list: Arguments {
                    arguments_list: arg
                }
            } 
        );

        FieldType { 
            name: "".to_string(),
            field: SchemaTypes::parse_to_base_type( &column ),
            attributes: attr
        }
    }
}

impl fmt::Display for Arg {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.val)
    }
}

#[derive(Debug)]
pub struct ParseTable {}

impl ParseTable {
    pub fn parse_model_name( obj_enum: Vec<ColumnDef> ) {

        for obj in obj_enum {
            println!( "{:?}\n", FieldType::from( &obj ) );
            // println!( "{:?}\n", obj );
        }

    }
}

pub fn parse_sql_file() -> std::io::Result<()> {
    
    let dialect = GenericDialect {};

    let mut file = File::open("sql_db.sql")?;
    let mut contents = String::new();    
    file.read_to_string(&mut contents)?;

    let ast = Parser::parse_sql(&dialect, &contents).unwrap();

    for table in ast {
        let Statement::CreateTable { ref columns, .. } = table else { todo!() };
        ParseTable::parse_model_name( columns.to_vec() );
        // println!( "{:?}\n", table );
    }

    Ok( () )
}