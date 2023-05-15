pub mod column_types {
    
    use crate::sql_schema::sql_migrations::compare::compare_tables::{ Compare };
    use crate::create_sql_migration::Changes;
    use crate::sql_schema::sql_migrations::format_sql::FormatSql;
    
    use std::collections::HashMap;
    use std::fmt;

    #[derive(Debug, PartialEq, Eq)]
    pub enum DefaultOption {
        Value( sqlparser::ast::Value ), 
        Function( sqlparser::ast::ObjectName )
    }

    impl fmt::Display for DefaultOption {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            match self {
                Self::Value( value ) => write!( f, "{}", format!( "{}", value ) ),
                Self::Function( object_name ) => write!( f, "{}()", format!( "{}", object_name ) )
            }
        }
    }

    #[derive(Debug, PartialEq, Eq)]
    pub enum SetOption {
        Null( sqlparser::ast::ColumnOption ),
        Default( DefaultOption ),
    }

    impl fmt::Display for SetOption {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            match self {
                Self::Null( value ) => write!( f, "set {}", format!( "{}", value ) ),
                Self::Default( val ) => write!( f, "set default {}", format!( "{}", val ) )
            }
        }
    }

    fn get_column_data_type( col: &sqlparser::ast::ColumnDef ) -> ( 
        sqlparser::ast::DataType,
        Option<SetOption>,
        Option<SetOption>
    ) {

        let mut change_null: Option<SetOption> = None;
        let mut change_default: Option<SetOption> = None;

        let sqlparser::ast::ColumnDef { 
            options, 
            data_type, .. 
        } = col.clone() else { todo!() };

        for option in options {
            match &option.option {
                sqlparser::ast::ColumnOption::Null | 
                sqlparser::ast::ColumnOption::NotNull => {
                    change_null = Some(
                        SetOption::Null( option.option )
                    );
                }, 
                sqlparser::ast::ColumnOption::Default( val ) => {
                    match val {
                        sqlparser::ast::Expr::Value( v ) => {
                            change_default = Some(
                                SetOption::Default(
                                DefaultOption::Value( v.clone() )
                            ) );
                        },
                        sqlparser::ast::Expr::Function( v ) => {
                            change_default =  Some(
                                SetOption::Default(
                                DefaultOption::Function( v.clone().name )
                            ) );
                        },
                        _ => {}
                    }
                }
                _ => {}
            }
        }

        ( data_type, change_null, change_default )
    }

    impl Compare {

        pub fn compare_column_types(
            registered_changes: &mut Vec<Changes>,
            table_schema: &sqlparser::ast::Statement,
            schema_col: &sqlparser::ast::ColumnDef,
            sql_col: &sqlparser::ast::ColumnDef
        ) {
            // let ( schema_table_chain, cols_schema ) = FormatSql::CreateTable::get_columns( table_schema ).unwrap();
            // let ( sql_table_chain, cols_sql )= FormatSql::CreateTable::get_columns( table_sql ).unwrap();

            let ( 
                schema_d_type,
                schema_null_option,
                schema_default
            ) = get_column_data_type( schema_col );
            let (
                sql_d_type,
                sql_null_option,
                sql_default
            ) = get_column_data_type( sql_col );

            if schema_null_option != sql_null_option {
                registered_changes.push( 
                    Changes::AlterColumnOption(
                        table_schema.clone(),
                        schema_col.clone(),
                        schema_null_option.unwrap(),
                    )
                );
            }

            if schema_default != sql_default {
                registered_changes.push( 
                    Changes::AlterColumnOption(
                        table_schema.clone(),
                        schema_col.clone(),
                        schema_default.unwrap(),
                    )
                );
            }

            if schema_d_type != sql_d_type {
                registered_changes.push( 
                    Changes::AlterColumnType(
                        table_schema.clone(),
                        schema_col.clone(),
                        schema_d_type,
                        sql_d_type
                    )
                );
            }

        }   
    }
}