// defines the whole Model's struct
// complete with namespace and name
// and columns
#[derive( Debug, Clone )]
pub struct Model {
    
    pub model_declaration: Option<ModelDeclaration>,
    pub columns:           Vec<Column>,
}

//
// public::User { ... }
// ^^^^^^  ^^^^    
// db      name
//
#[derive( Debug, Clone )]
pub struct ModelDeclaration {
    pub database: String,
    pub name:     String,
}

// single Column in model struct
// 
// email String    @validate; 
// ^^^^^ ^^^^^^    ^^^^^^^^^ 
// name  base_type directive(s)
//
// username String::unique();
// ^^^^^^^^ ^^^^^^  ^^^^^^^^
// -||-     -||-    function    
#[derive( Debug, Clone )]
pub struct Column {
    pub name:       Option<String>,
    pub base_type:  Option<BaseType>,
    pub directives: Option<Vec<Directive>>,
}

// directives run before the insert 
// and select queries
// --------------------------------
//
// email String @validate;
//              ^^^^^^^^^
//
// email String @has( "@gmail.com" );
//              ^^^^^^^^^^^^^^^^^^^^
//
#[derive( Debug, Clone )]
pub struct Directive {
    pub name:           String,
    pub arguments_list: ArgumentsList
}

//
// username String::includes( "@", "2", "_" );
//                            ^^^^^^^^^^^^^
//                                 this
//
#[derive( Debug, Clone )]
pub struct ArgumentsList {
    pub base_type: Vec<BaseType>
}

//
// maps string types from the schema
// to and enum
//
#[derive( Debug, Clone )]
pub enum BaseTypeNames {
    // enums compile to SQL as follows:
    //
    // username String
    //          ^^^^^^
    //           TEXT
    //
    // username String::length( 256 )
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
    Custom,  
    // posts Vec<Posts>
    //           ^^^^^
    //         table type
    Table    
}

//
// username String::unique();
// ^^^^^^^^ ^^^^^^  ^^^^^^^^
//   -||-    type   function
//
// posts Vec<Posts>;
// ^^^^^ ^^^ ^^^^^
// -||- -||- generic, also a base_type
//
#[derive( Debug, Clone )]
pub struct BaseType {
    pub name:     BaseTypeNames,
    pub generic:  Box<BaseType>,
    pub argument: Argument
}

//
// authorId ForeignKey<String, User::id>;
// ^^^^^^^^ ^^^^^^^^^^ ^^^^^^  ^^^^  ^^
// -||-     -||-       -||-    -||-  argument
//
#[derive( Debug, Clone )]
pub struct Argument {
    pub name: String
}

//
// username String::unique();
// ^^^^^^^^ ^^^^^^  ^^^^^^^^
// -||-     -||-    function
//
//  id   PrimaryKey<String>::uuidv4();
//  ^^   ^^^^^^^^^^ ^^^^^^   ^^^^^^^^
// -||-  -||-       -||-     function
//
#[derive( Debug, Clone )]
pub struct Function {
    pub name:           String,
    pub arguments_list: ArgumentsList
}