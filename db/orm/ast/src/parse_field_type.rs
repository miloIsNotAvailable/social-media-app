pub mod parse {

    use crate::schema::{ Pairs, Rule, Pair };
    use crate::base_type::{ parse_base_type, BaseType };
    use crate::expression::{ parse_arg_list, Arguments };
    use std::fmt;

    #[derive(Debug)]
    pub struct FieldType {
        pub name: String,
        pub field: BaseType,
        pub attributes: Vec<FieldAttrType>
    }
    
    impl fmt::Display for FieldType {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            
            let mut opt: String = "not null".to_string();

            let a = String::from( "default" );
            let b = String::from( "db.VarChar" );
            let c = String::from( "relation" );

            match &self.name {
                b => {
                    // let mut attrs = 
                    let formatted = format!( "character varying({})", 255 );
                },
                a => opt = "def".to_string(),
                c => opt = "var".to_string(),
                _ => { opt = "sdfsdf".to_string() }
            }

            write!(f, "{} {}", format!( "{}", self.field), opt )
        }
    }

    #[derive(Debug)]
    pub struct FieldAttrType {
        pub path: String,
        pub arguments_list: Arguments
    }

    pub fn parse_field_attribute( pairs: Pairs<'_, Rule> ) -> FieldAttrType {

        let mut path: Option<String> = None;

        let mut arguments_list: Arguments = Arguments::default();

        for curr in pairs {
            
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
        
        FieldAttrType { path: path.unwrap(), arguments_list }
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
                },
                Rule::identifier => {
                    name = Some( curr.as_str().to_string() );
                },
                _ => {}
            }
        }
        // println!( "{:?}", attributes );
        FieldType { name: name.unwrap(), field, attributes }
    }
}