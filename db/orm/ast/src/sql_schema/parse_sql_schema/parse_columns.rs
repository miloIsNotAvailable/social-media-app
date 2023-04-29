pub mod ParseColumns {

    use crate::sql_schema::parse_sql_schema::Schema;
    use crate::sql_schema::query_sql_schema::QuerySqlSchema;

    impl Schema {

        pub fn columns_parsed( table: QuerySqlSchema ) -> String {

            let table_name = Schema::Table( table.table ).table();
            let cols = Schema::Columns( table.columns ).columns();
            let constraints = Schema::Constraints( table.constraints ).constraints();
        
            format!( 
                "{} (\n{},\n{}\n) tablespace pg_default;",
                table_name,
                cols, 
                constraints
            )
        }

        pub fn columns( &self ) -> String {
            
            let mut cols: Vec<String> = vec![];
            
            match self {
                Schema::Columns( val ) => {

                    for col in val {
                        cols.push( 
                            format!( 
                                "\t{} {} {}{}",
                                &col.column_name,
                                &col.data_type,
                                parse_is_nullable( &col.is_nullable ).trim(),
                                parse_column_default( &col.column_default ),
                            )
                        );
                    }
                },
                _ => todo!()
            }

            cols.join( ",\n" )
        }

        pub fn constraints( &self ) -> String {
            
            let mut cols: Vec<String> = vec![];
            
            match self {
                Schema::Constraints( val ) => {

                    for constraint in val {
                        match &constraint.table_name {
                            Some( foreign_table ) => {
                                cols.push(
                                    format!(
                                        "\tconstraint {} foreign key({}) references \"{}\"({}) on update cascade on delete restrict",
                                        &constraint.constraint_name,
                                        &constraint.column_name,
                                        foreign_table,
                                        &constraint.foreign_key_name,
                                    )
                                );
                            },
                            _ => {
                                cols.push(
                                    format!(
                                        "\tconstraint {} key({})",
                                        &constraint.constraint_name,
                                        &constraint.column_name
                                    )
                                );
                            }
                        }
                    }
                },
                _ => todo!()
            }

            cols.join( ",\n" )
        }
    }

    fn parse_is_nullable( is_nullable: &String ) -> String {

        let mut res: Option<String> = None;

        match is_nullable.as_str() {
            "YES" => res = Some( "null".to_string() ),
            "NO" => res = Some( "not null".to_string() ),
            _ => {}
        }

        res.unwrap()
    }

    fn parse_column_default( column_default: &Option<String> ) -> String {
        match column_default {
            Some( col ) => format!( " default {}", col.to_string() ),
            _ => "".to_string()
        }
    }
}