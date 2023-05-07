pub mod parse_fields {

    use crate::parse_schema::schema::{ Pairs, Rule };
    use crate::parse_schema::parse_schema_field_type::parse_field_type;
    use crate::parse_schema::parse_schema_field_type::parse_field_type::{ FieldData, FieldType, Attr, AttrType };

    use std::fmt;

    #[derive(Debug)]
    pub struct Field {
        pub field: Vec<FieldType>
    }

    impl Attr {
        pub fn is_constraint( &self ) -> bool {
            match self {
                Self::PrimaryKey | Self::Unique => true,
                Self::Relation => true,
                _ => false
            }
        }
    }

    impl FieldData {
        pub fn has_default( &self ) -> Option<&AttrType> {
            let filtered: Option<&AttrType> = self.attributes
            .iter()
            .find( |x| match &x.path {
                Attr::Default( val ) => true,
                _ => false
            } );

            filtered
        }

        // checks for primary key
        // if found check for default value
        // then infer it when compiling to SQL
        // otherwise type will be base_type
        pub fn is_primary_key( &self ) -> Result<Option<&AttrType>, ()> {
            
            let filtered: Vec<&AttrType> = self.attributes
            .iter()
            .filter( |x| match &x.path {
                Attr::PrimaryKey => true,
                _ => false
            } )
            .collect();

            if !filtered.is_empty() {
                
                let def_ = self.has_default();
                return Ok( def_ );
            }

            Err( () )
        }

        pub fn get_primary_key_constraint( &self ) -> Option<( String, String )> {

            match self.is_primary_key() {
                Ok( e ) => {
                    match e {
                        Some( default ) => {

                            let ( type_name, default_if_exists ) = self.base_type.sql_type.key_default_type();

                            let col = format!( "{} {} {} {}", self.name, type_name,  self.base_type.is_optional, default_if_exists );
                            let constr = format!( "constraint {}_pkey primary key ({})", self.name, self.name );

                            Some( ( col, constr ) )
                        },
                        None => {
                            let col = format!( "{} {}", self.name, self.base_type );
                            let constr = format!( "constraint {}_pkey primary key ({})", self.name, self.name );
    
                            Some( ( col, constr ) )
                        }
                    }
                },
                Err( () ) => None 
            }
        }
 
        pub fn is_unique( &self ) -> Result<Option<&AttrType>, ()> {
            
            let filtered: Vec<&AttrType> = self.attributes
            .iter()
            .filter( |x| match &x.path {
                Attr::Unique => true,
                _ => false
            } )
            .collect();

            if !filtered.is_empty() {
                
                let def_ = self.has_default();
                return Ok( def_ );
            }

            Err( () )
        }

        pub fn get_unique_constraint( &self ) -> Option<( String, String )> {

            match self.is_unique() {
                Ok( e ) => {
                    match e {
                        Some( default ) => {

                            let col = format!( "{} {} {}", self.name, self.base_type, default.clone() );
                            let constr = format!( "constraint {}_unq unique ({})", self.name, self.name );

                            Some( ( col, constr ) )
                        },
                        None => {
                            let col = format!( "{} {}", self.name, self.base_type );
                            let constr = format!( "constraint {}_unq unique ({})", self.name, self.name );
    
                            Some( ( col, constr ) )
                        }
                    }
                },
                Err( () ) => None 
            }
        }

        pub fn is_relation( &self ) -> Result<Option<&AttrType>, ()> {
            
            let filtered: Vec<&AttrType> = self.attributes
            .iter()
            .filter( |x| match &x.path {
                Attr::Relation => true,
                _ => false
            } )
            .collect();

            if !filtered.is_empty() {
                
                let def_ = self.has_default();
                return Ok( def_ );
            }

            Err( () )
        }

        pub fn get_relation_constraint( &self ) -> Option<( String, String )> {

            match self.is_relation() {
                Ok( e ) => {

                    let col = format!( "" );
                   
                    let fields: Vec<(String, String)> = self.attributes
                    .iter()
                    .map(
                        |arg| { 
                            let fields_: Vec<String> = arg.arguments_list.arguments_list
                            .iter()
                            .map( |a| format!( "{}", a.expression ) )
                            .rev().collect();

                            // unpacking... [ primary key, foreign key ]
                            let [ ref pk, ref fk ] = fields_[..] else { panic!() };

                            return ( pk.clone(), fk.clone() ); 
                        }
                    ).rev().collect();

                    let [ ref keys ] = fields[..] else { panic!() };
                    let ( pk, fk ) = keys;

                    let constr = format!( "constraint {}_fkey foreign key({fk}) references public.{}({pk}) on update cascade on delete restrict", 
                        self.base_type.sql_type,
                        self.base_type.sql_type
                    );

                    Some( ( col, constr ) )
                },
                Err( () ) => None 
            }
        }
    }

    impl fmt::Display for FieldType {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            match self {
                Self::ConstraintType( field ) => {

                    let generated = field.get_primary_key_constraint();
                    let generated_unique = field.get_unique_constraint();
                    let generated_relation = field.get_relation_constraint();
                    
                    let mut cols: Vec<String> = vec![];
                    let mut constrs: Vec<String> = vec![];

                    match (
                        generated, 
                        generated_unique,
                        generated_relation
                    ) {
                        (Some( ( column, constraint ) ), _, _) => {
                            cols.push( column );
                            constrs.push( constraint );
                        },
                        (_, Some( ( column, constraint ) ), _) => {
                            cols.push( column );
                            constrs.push( constraint );
                        },
                        ( _, _, Some( ( column, constraint ) ) ) => {
                            // cols.push( column );
                            constrs.push( constraint );
                        },
                        (None, None, None) => {}
                    }

                    if( cols.is_empty() ) {
                        return write!( f, "{}", constrs.join( "" ) );
                    }
                    write!( f, "{},\n{}", cols.join( "" ), constrs.join( "" ) )
                },
                Self::Regular( val ) => {
                    
                    let mut types_arr: Vec<String> = vec![];

                    let attrs_formatted: Vec<String> = val.attributes
                    .iter()
                    .map( |a| format!( "{a}" ) )
                    .rev().collect();

                    let formatted = format!( "{} {} {}", 
                        val.name, 
                        format!( "{}", val.base_type ), 
                        attrs_formatted.join( " " ) 
                    );

                    if !val.base_type.sql_type.table_type_sql() {    
                        types_arr.push( formatted );
                    }

                    write!( f, "{}", types_arr.join( "" ) )
                }
            }
        }
    }

    pub fn parse_field( pairs: Pairs<'_, Rule> ) -> Field {
    
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
        Field { field } 
    }
}