pub mod parse_schema;
pub mod parse_table_name;
pub mod parse_columns;

use crate::sql_schema::query_sql_schema::query_table_data::QueryTableData;
use crate::sql_schema::query_sql_schema::query_table_names::QueryTableNames::{ QueryTableName };
use crate::sql_schema::query_sql_schema::query_sql_columns::QuerySqlColumns::{ QuerySqlColumn };
use crate::sql_schema::query_sql_schema::query_sql_relations::QuerySqlRelations::{ QuerySqlRelation };

#[derive(Debug)]
pub enum Schema {
    Table( QueryTableName ),
    Columns( Vec<QuerySqlColumn> ), 
    Constraints( Vec<QuerySqlRelation> )
}
