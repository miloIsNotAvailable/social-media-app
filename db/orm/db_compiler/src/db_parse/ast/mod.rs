// ----     boring file mod declarations     ----
// 
pub mod base_types;
//
// ---- no more boring file mod declarations ----



// ---- std and file imports ----
//
use crate::db_parse::ast::base_types::{ BaseTypeNames };
//
// ---- t-t-t-that's it folks ----

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
    pub name:      BaseTypeNames,
    pub generic:   Option<ArgumentsList>,
    pub function:  Option<Function>,
    pub argument:  Option<Argument>
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
    pub name:           Option<String>,
    pub arguments_list: Option<ArgumentsList>
}