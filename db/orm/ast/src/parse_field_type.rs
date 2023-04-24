pub mod parse {

    use crate::schema::{ Pairs, Rule, Pair };
    use crate::base_type::{ parse_base_type, BaseType };
    use crate::expression::{ parse_expression, Expression };

    #[derive(Debug)]
    pub struct FieldType {
        pub name: Option<String>,
        pub field: BaseType,
        pub attributes: Vec<FieldAttrType>
    }
    
    #[derive(Debug)]
    pub struct FieldAttrType {
        pub path: Option<String>,
        // pub arg_list: Options<FieldArgListType>
    }

    pub fn parse_field_arg_list( pairs: Pairs<'_, Rule> ) -> FieldAttrType {

        let mut field_attrs = FieldAttrType {
            path: None
        };

        for curr in pairs {
            
            match curr.as_rule() {
                Rule::path => {
                    field_attrs.path = Some( curr.as_str().to_string() );
                },
                Rule::arguments_list => {
                    parse_expression( curr.into_inner() );
                    // println!( "{:?}", curr.into_inner() );
                },
                _ => {}
            }
        }

        return field_attrs
    }

    pub fn parse_field_attribute( pairs: Pairs<'_, Rule> ) -> FieldAttrType {

        let mut field_attrs = FieldAttrType {
            path: None
        };

        for curr in pairs {
            
            match curr.as_rule() {
                Rule::path => {
                    field_attrs.path = Some( curr.as_str().to_string() );
                },
                Rule::arguments_list => {
                    parse_expression( curr.into_inner() );
                },
                _ => {}
            }
        }

        return field_attrs
    }

    pub fn parse_field_type( pairs: Pairs<'_, Rule> ) -> FieldType {
    
        let mut name: Option<String> = None;
        let mut attributes: Vec<FieldAttrType> = Vec::new();
        let mut field: BaseType = BaseType {
            base_type: None,
            optional_type: None,
            list_type: None        
        };
    
        for curr in pairs {
    
            match curr.as_rule() {
                Rule::field_type => {
                    // println!( "{:?}", curr.into_inner().next().unwrap() );
                    field = parse_base_type( curr.into_inner().next().unwrap() );
                },
                Rule::field_attribute => {
                    
                    attributes.push(
                        parse_field_attribute( curr.into_inner() )
                    );
                    // println!(  "{}", curr.into_inner() );
                },
                Rule::identifier => {
                    name = Some( curr.as_str().to_string() );
                    // println!( "{:?}", curr.as_str() );
                },
                _ => {}
            }
        }
        // println!( "{:?}", attributes );
        return FieldType { name, field, attributes };
    }
}