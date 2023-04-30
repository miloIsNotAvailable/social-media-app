pub mod SchemaTypes {

    use crate::sql_schema::parse_sql_schema::parse_schema;
    use crate::parse_field_type::parse::{ FieldType, FieldAttrType };
    use crate::parse_base_type::parse::{ BaseType };
    use crate::parse_expression::parse::{ Expr, Argument, Arguments };

    use sqlparser::ast::{ 
        DataType, 
        ColumnOption, 
        ColumnOptionDef, 
        ColumnDef, 
        ObjectName,
        Expr as ParserExpr,
        Function
    };

    pub fn parse_to_base_type( column: &ColumnDef ) -> BaseType {
        
        BaseType {
            base_type: parse_types( column.clone() ),
            optional_type: nullable( column.clone() ),
            list_type: Some( false )
        }
    }

    pub fn parse_types( data_type: ColumnDef ) -> Option<String> {

        match data_type.data_type {

            DataType::Uuid | DataType::Text => Some("String".to_string()),
            DataType::CharacterVarying( val ) => Some("String".to_string()),
            DataType::Timestamp( n, time ) => Some("DateTime".to_string()),
            DataType::Text => Some("String".to_string()),
            DataType::Integer( n ) => Some("Int".to_string()),
            _ => { None }
        }
    }

    pub fn nullable( col_opts: ColumnDef ) -> Option<bool> {
        
        let mut is_nullable: Option<bool> = Some( false );

        for opt in col_opts.options {
            match opt.option {
                ColumnOption::Null | ColumnOption::NotNull => {
                    is_nullable = Some(parse_nullable( opt.option ));
                },
                _ => {}
            }
        }
        
        is_nullable
    }

    pub fn match_col_opts( col_opts: Vec<ColumnOptionDef> ) -> Vec<Argument> {

        let mut args: Vec<Argument> = vec![];

        for opt in col_opts {
            match opt.option {
                ColumnOption::Default( val ) => {
                    match val {
                        ParserExpr::Function( v ) => {
                            let e = parse_default_object_name( v.name );
                            // println!( "fun {:?}", e );
                            args.push( e );
                        },
                        ParserExpr::Value( val ) => {
                            let e = parse_default_value( val );
                            // println!( "fun {:?}", e );
                            args.push( e );
                        }
                        _ => {}
                    } 
                }
                _ => {}
            }
        }

        args
    }

    //FieldType { name: "published", field: BaseType { base_type: Some("Boolean"), optional_type: None, list_type: None }, attributes: [FieldAttrType { path: "default", arguments_list: Arguments { arguments_list: [Argument { identifier: None, expression: ConstantValue("false") }] } }] }

    pub fn parse_default_value( val: sqlparser::ast::Value ) -> Argument {
        
        let mut arg: Option<Argument> = None;

        match val {
            sqlparser::ast::Value::Number( num, boolean ) => arg = Some(Argument {
                identifier: None,
                expression: Expr::ConstantValue( num.to_string() )
            }),
            sqlparser::ast::Value::Boolean( boolean ) => arg = Some(Argument {
                identifier: None,
                expression: Expr::ConstantValue( boolean.to_string() )
            }),
            _ => { todo!() }
        }

        arg.unwrap()
    }

    pub fn parse_default_object_name( obj: ObjectName ) -> Argument {
        
        let mut arg: Option<Argument> = None;

        let curr = "CURRENT_TIMESTAMP".to_string();
        let uuid = "uuid_generate_v4".to_string();
        let serial = "serial".to_string();

        match obj {
            ObjectName( defs ) => {
                for def in defs {
                    match ( def.value ) {
                        curr => arg = Some(Argument {
                            identifier: None,
                            expression: Expr::Function( "now".to_string(), ["()".to_string()].to_vec() )
                        }),
                        uuid => arg = Some(Argument {
                            identifier: None,
                            expression: Expr::Function( "uuid".to_string(), ["()".to_string()].to_vec() )
                        }),
                        serial => arg = Some(Argument {
                            identifier: None,
                            expression: Expr::Function( "autoincrement".to_string(), ["()".to_string()].to_vec() )
                        }),
                        _ => { todo!() }
                    }        
                }
            },
            _ => {}
        }

        arg.unwrap()
    }

    pub fn parse_nullable( opt: ColumnOption ) -> bool {
        match opt {
            ColumnOption::Null => true,
            _ => false,
        }
    }
}