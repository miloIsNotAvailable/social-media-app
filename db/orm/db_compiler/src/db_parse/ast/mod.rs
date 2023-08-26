// defines the whole Model's struct
// complete with namespace and name
// and columns
#[derive( Debug, Clone )]
pub struct Model {
    
    pub model_declaration: Option<ModelDeclaration>,
    pub columns:           Option<Vec<Column>>,
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
    name:       String,
    base_type:  BaseType,
    directives: Vec<Directive>,
}

#[derive( Debug, Clone )]
pub struct Directive {
    name:           String,
    arguments_list: ArgumentsList
}

#[derive( Debug, Clone )]
pub struct ArgumentsList {
    base_type: Vec<BaseType>
}

#[derive( Debug, Clone )]
pub enum BaseTypeNames {
    String,
    Bool,
    Int,
    DateTime,
    Custom,
    Table    
}

//
// username String::unique();
// ^^^^^^^^ ^^^^^^  ^^^^^^^^
// -||-     -||-    function
//
// posts Vec<Posts>;
// ^^^^^ ^^^ ^^^^^
// -||- -||- generic, also a base_type
//
#[derive( Debug, Clone )]
pub struct BaseType {
    name:     BaseTypeNames,
    generic:  Box<BaseType>,
    argument: Argument
}

//
// authorId ForeignKey<String, User::id>;
// ^^^^^^^^ ^^^^^^^^^^ ^^^^^^  ^^^^  ^^
// -||-     -||-       -||-    -||-  argument
//
#[derive( Debug, Clone )]
pub struct Argument {
    name: String
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
    name:           String,
    arguments_list: ArgumentsList
}