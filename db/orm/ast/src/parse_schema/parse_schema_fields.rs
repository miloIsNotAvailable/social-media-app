pub mod parse_fields {

    use crate::parse_schema::schema::{ Pairs, Rule };
    use crate::parse_schema::parse_schema_field_type::parse_field_type;
    use crate::parse_schema::parse_schema_field_type::parse_field_type::{ FieldData, FieldType, Attr, AttrType };

    use std::fmt;

    #[derive(Debug)]
    pub struct Field {
        // pub field: Vec<FieldType<'a>>
    }

    impl Attr {
        pub fn is_constraint( &self ) -> bool {
            match self {
                Self::PrimaryKey | Self::Unique => true,
                Self::Relation( _ ) => true,
                _ => false
            }
        }
    }

    enum PrimaryKey {}

    impl FieldData {
        pub fn is_primary_key( &self ) -> bool {
            
            let filtered: Vec<&AttrType> = self.attributes
            .iter()
            .filter( |x| match &x.path {
                Attr::PrimaryKey => true,
                _ => false
            } )
            .collect();

            !filtered.is_empty()
        }

        pub fn is_relation( &self ) -> bool {
            
            let filtered: Vec<&AttrType> = self.attributes
            .iter()
            .filter( |x| match &x.path {
                Attr::Relation( _ ) => true,
                _ => false
            } )
            .collect();

            !filtered.is_empty()
        }

        pub fn is_unique( &self ) -> bool {
            
            let filtered: Vec<&AttrType> = self.attributes
            .iter()
            .filter( |x| match &x.path {
                Attr::Unique => true,
                _ => false
            } )
            .collect();

            !filtered.is_empty()
        }
    }

    impl fmt::Display for FieldType {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            match self {
                Self::ConstraintType( field ) => {
                    if field.is_primary_key() {

                        reutrn write!( f, "hey" );
                    }
                    
                    write!( f, "hey" )
                },
                Self::Regular( _ ) => write!( f, "hey" )
            }
        }
    }

    pub fn parse_field( pairs: Pairs<'_, Rule> ) {
    
        let mut field: Vec<FieldType> = vec![];

        for curr in pairs {
    
            match curr.as_rule() {
                Rule::field_declaration => {
                    let e = parse_field_type::parse_field_type( curr.into_inner() );
                           
                    let mut is_constraint: Vec<&AttrType> = e.attributes
                    .iter()
                    .filter( |x| x.path.is_constraint() )
                    .collect();
            
                    match is_constraint.is_empty() {
                        false => field.push(FieldType::ConstraintType( e )),
                        true => field.push(FieldType::Regular( e )),
                    }   
                },
                _ => {}
            }        
        }
        
        for f_ in field {

            println!( "{}", f_ );
        }
        // Field { field } 
    }
}