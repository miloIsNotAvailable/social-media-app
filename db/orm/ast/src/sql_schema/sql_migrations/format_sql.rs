pub mod FormatSql {

    pub struct CreateTable {}
    impl CreateTable {
        pub fn get_name( table: sqlparser::ast::Statement ) -> Option<String> {
            match table {
                sqlparser::ast::Statement::CreateTable { name, .. } => {
                    let name_idents = ObjectName::get_values( name );
                    let [ ref table_name, .. ] = name_idents[..] else { todo!() };
                    
                    Some( table_name.to_string() )
                },
                _ => None 
            }
        }

        // monads
        pub fn get_columns( table: &sqlparser::ast::Statement ) -> Option<(
            &sqlparser::ast::Statement, 
            Vec<sqlparser::ast::ColumnDef>
        )> {
            match table {
                sqlparser::ast::Statement::CreateTable { columns, .. } => {
                    
                    Some( 
                        ( &table, columns.clone() ) 
                    )
                },
                _ => None 
            }
        }
    }

    pub struct ObjectName {}
    impl ObjectName {
        pub fn get_values( object_name: sqlparser::ast::ObjectName ) -> Vec<String> {
            match object_name {
                sqlparser::ast::ObjectName( idents ) => {
                    
                    idents
                    .into_iter()
                    .map( |ident| ident.value )
                    .rev().collect()
                },
                _ => { todo!() }
            }
        }
    }
}