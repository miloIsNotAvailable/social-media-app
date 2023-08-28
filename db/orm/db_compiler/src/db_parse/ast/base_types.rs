//
// maps string types from the schema
// to and enum
//
// each one will implement its own extendable traits
//
// functions will parse strings/ints etc. using rust's 
// parse function 
//
// table arguments like User::id
// will be just taken from hashmaps
//
#[derive( Debug, Clone )]
pub enum BaseTypeNames {
    // enums compile to SQL as follows:
    //
    // username String;
    //          ^^^^^^
    //           TEXT
    //
    // username String::length( 256 );
    //          ^^^^^^^^^^^^^^^^^^^^^
    //              VARCHAR( 256 )
    //
    String,  

    // followed Bool
    //          ^^^^
    //         BOOLEAN
    //
    Bool,

    // num Int
    //     ^^^
    //     INT
    //
    Int,     

    // createdAt DateTime
    //           ^^^^^^^^
    //           timestamp with time zone not null default now()
    //
    DateTime,

    // custom is for custom ffi
    // defined types
    // Table for table type, 
    // found in hash map
    // ----------------------
    // 
    // ---- ffi/types.rs ----
    // enum MyFFIType { ... }
    // 
    // impl fmt::Display for Day {
    // fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result { ... }
    // 
    // ---- my_schema.rs ----
    // user MyFFIType
    //      ^^^^^^^^^
    //     custom type
    Custom( String ),  
    // posts Vec<Posts>
    //           ^^^^^
    //         table type
    Table    
}

impl BaseTypeNames {
    pub fn map_types( string_type: String ) -> BaseTypeNames {
        match string_type.as_str() {
            "String"   => { BaseTypeNames::String },
            "DateTime" => { BaseTypeNames::DateTime },
            "Int"      => { BaseTypeNames::Int },
            "Bool"     => { BaseTypeNames::Bool },
            e          => { BaseTypeNames::Custom( e.to_string() ) }
        }
    }
}