pub mod parse_field_type {
    use std::fmt;
    use crate::parse_schema::schema::{ Pairs, Rule };
    use crate::parse_schema::parse_schema_expression::parse_expression::{ Arguments, parse_arg_list };
    use crate::parse_schema::parse_schema_base_type::parse_base_type::{ BaseTypes };
    use crate::parse_schema::parse_schema_base_type::parse_base_type::parse_base_type;

    #[derive(Debug)]
    pub struct FieldData {
        pub name: String,
        pub base_type: BaseTypes, 
        pub attributes: Vec<AttrType>
    }

    #[derive(Debug)]
    pub enum FieldType {
        ConstraintType( FieldData ),
        Regular( FieldData )
    }

    // converting to enum, 
    // ill add a way to convert to both 
    // and from sql using those
    #[derive(Debug, PartialEq)]
    pub enum Attr {
        PrimaryKey,
        Default( String ),
        // this gets mapped to Attr::DEFAULT( "now()" )
        UpdatedAt,
        Unique,
        VarChar( String ),
        Relation( Option<String> )
    }
    
    impl Attr {
        pub fn parse_to_enum( 
            path: &String, 
            args_list: &Arguments 
        ) -> Attr {
            match path.as_str() {
                "id" => Attr::PrimaryKey,
                "default" => Attr::Default( format!( "{}", args_list.clone() ) ),
                "updatedAt" => Attr::UpdatedAt,
                "unique" => Attr::Unique,
                "db.VarChar" => Attr::VarChar( format!( "{}", args_list.clone() ) ),
                _ => todo!()
            }
        }
    }

    // use this to help convert to and from sql
    #[derive(Debug)]
    pub struct AttrType {
        pub path: Attr,
        pub arguments_list: Arguments
    }

    pub fn parse_field_attribute( pairs: Pairs<'_, Rule> ) -> AttrType {

        let mut path: Option<String> = None;

        let mut arguments_list: Arguments = Arguments::default();

        for curr in pairs.clone() {
            
            match curr.as_rule() {
                Rule::path => {
                    path = Some( curr.as_str().to_string() );
                },
                Rule::arguments_list => {
                    let e = parse_arg_list( curr.into_inner(), &mut arguments_list );
                },
                _ => {}
            }
        }

        AttrType{ 
            path: Attr::parse_to_enum(
                &path.unwrap(),
                &arguments_list,
            ), 
            arguments_list 
        }
    }

    pub fn parse_field_type( pairs: Pairs<'_, Rule> ) -> FieldData {
    
        let mut name: Option<String> = None;
        let mut base_type_name: Option<BaseTypes> = None;
        let mut attributes: Vec<AttrType> = vec![];

        for curr in pairs {
    
            match curr.as_rule() {
                Rule::field_type => {
                    // println!( "{:?}", curr.into_inner().next().unwrap() );
                    base_type_name = Some(parse_base_type( curr.into_inner().next().unwrap() ));
                    // field = e.clone();
                    // base_type_name = Some(format!( "{}", e.clone().sql_type ));
                },
                Rule::field_attribute => {
                    
                    attributes.push(
                        parse_field_attribute( curr.into_inner() )
                    );
                },
                Rule::identifier => {
                    name = Some( curr.as_str().to_string() );
                },
                _ => {}
            }
        }
        // println!( "{:?}", attributes );
        FieldData { 
            name: name.unwrap(), 
            base_type: base_type_name.unwrap(), 
            attributes 
        }
    }
}