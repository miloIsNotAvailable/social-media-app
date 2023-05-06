pub mod parse_model_schema {

    use crate::parse_schema::schema::{ Pairs, Rule };
    use crate::parse_schema::parse_schema_fields::parse_fields;

    #[derive(Debug)]
    pub enum ParseModelSchema {
        Name( String ),
        // Fields( Vec<Field<'a>> )
    }

    #[derive(Debug)]
    pub struct Model {
        pub name: ParseModelSchema,
        pub fields: ParseModelSchema
    }

    pub fn parse_model( pairs: Pairs<'_, Rule> ) {
        
        let mut name: Option<String> = None;
        // let mut fields: Vec<Field> = vec![];
    
        for curr in pairs {
            match curr.as_rule() {
                Rule::identifier => name = Some( 
                    curr.as_str().to_string() 
                ),
                // model keyword
                Rule::MODEL_KEYWORD => {}, 
                Rule::model_contents => {
                    // println!( "{:?}", curr.into_inner() );
                    // fields.push(  );
                    parse_fields::parse_field( curr.into_inner() );
                }, 
                _ => {}
            }
        }

        // Model {
        //     name: ParseModelSchema::Name( name.unwrap() ),
        //     fields: ParseModelSchema::Fields( fields )
        // }
    }
}