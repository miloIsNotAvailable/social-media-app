pub mod parse_fields {

    use crate::parse_schema::schema::{ Pairs, Rule };
    use crate::parse_schema::parse_schema_field_type::parse_field_type;
    use crate::parse_schema::parse_schema_field_type::parse_field_type::{ FieldData, FieldType, Attr, AttrType, RowType };

    use std::fmt;

    #[derive(Debug)]
    pub struct Field {
        pub field: Vec<FieldData>
    }

    pub fn parse_field( pairs: Pairs<'_, Rule> ) -> Field {
    
        let mut field: Vec<FieldData> = vec![];

        for curr in pairs {
    
            match curr.as_rule() {
                Rule::field_declaration => {
                    let e = parse_field_type::parse_field_type( curr.into_inner() );
                    field.push( e );
                           
                },
                _ => {}
            }        
        }
        Field { field } 
    }
}