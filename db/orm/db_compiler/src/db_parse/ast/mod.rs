// ----     boring file mod declarations     ----
// 
pub mod base_types;
pub mod sql_string;
//
// ---- no more boring file mod declarations ----



// ---- std and file imports ----
//
use crate::db_parse::ast::base_types::{ BaseTypeNames };
//
// ---- t-t-t-that's it folks ----

// impl traits for each struct
pub trait Generation {
    // this will generate rust structs that 
    // then will be compiled to wasm
    // with js' pg librsry for querying 
    // each rust class will have it's own 
    // function for generating queries etc.
    //
    fn generate_rust_classes( &self ) -> String;
    
    // this will generate sql migrations etc.
    // for updating schema
    //
    fn generate_sql_tables( &self ) {}
    // generates ts types for each sql table
    fn generate_ts_types( &self ) {}
}

// defines the whole Model's struct
// complete with namespace and name
// and columns
#[derive( Debug, Clone )]
pub struct Model {
    
    pub model_declaration: Option<ModelDeclaration>,
    pub columns:           Vec<Column>,
}

impl Generation for Model {
    fn generate_rust_classes( &self ) -> String {

        match &self.model_declaration {
            Some( dec ) => {
                format!(
                    "{} {{ \n{},\n{} }}",
                    dec.generate_enum_declaration(),
                    dec.generate_rust_classes(),
                    self.generate_columns_declaration()
                )
            },
            None => panic!( "no model declaration" )
        }
    }
}

impl Model {
    pub fn generate_columns_declaration( &self ) -> String {
        
        let parsed_columns = self.columns
                             .iter()
                             .map( |col| col.generate_rust_classes() )
                             .collect::<Vec<String>>().join( ", " );

        format!( "\tColumns( Vec::from( {} ) )", parsed_columns )
    }
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

impl Generation for ModelDeclaration {
    // generate rust enum for
    // each table
    // 
    // include the Declaration enum
    // pub enum User {
    //     Declaration( "User", "public" ),
    //     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // } 
    //
    fn generate_rust_classes( &self ) -> String {

        format!( "\tDeclaration( {:?}, {:?} )", 
            self.name, 
            self.database 
        )
    }
}

impl ModelDeclaration {
    pub fn generate_enum_declaration( &self ) -> String {
        
        format!( "pub enum {}", self.name )
    }
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

impl Generation for Column {
    // generate rust enum for
    // each table
    // 
    // include the Declaration enum
    // pub enum User {
    //     Column( SqlString::length( 256 ), None,     false ),
    //             ^^^^^^^^^^^^^^^^^^^^^^^^  ^^^^      ^^^^^
    //             base type                 directive optional
    // } 
    //
    fn generate_rust_classes( &self ) -> String {

        let mut parsed_type: String = String::from( "" );

        match &self.name {
            Some( n ) => {
                format!( "Column({:?}, {})",
                    n,
                    self.base_type
                    .as_ref()
                    .expect( "yikes" )
                    .generate_rust_classes() 
                )
            },
            None => panic!( "no column name" )
        }
    }     
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

impl Generation for BaseType {

    //
    // Column( SqlString, length,   None,              None )
    //         ^^^^^^^^^  ^^^^^^    ^^^^               ^^^^
    //         type       function function arguments, directive
    //
    fn generate_rust_classes( &self ) -> String {

        let mut parsed_function = String::from( "" );
        // let mut parsed_argument = String::from( "" );

        match &self.function {
            Some( f ) => { 
                parsed_function = format!( "::{}", f.generate_rust_classes() ); 
            },
            None      => {}
        }

        match &self.argument {
            Some( a ) => { 
                parsed_function = format!( "::{}", a.generate_rust_classes() ); 
            },
            None      => {}
        }

        // parse Column enum arguments
        // Column( SqlString, function, None, None )
        //         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        //
        format!( "{}{}", 
            BaseTypeNames::generate_rust( &self.name ),
            parsed_function.clone(),
            // parsed_function.generate_rust_classes() || String::from( "None" ),
            // parsed_argument.generate_rust_classes() || String::from( "None" ),
        )
    }  
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

impl Generation for Argument {
    fn generate_rust_classes( &self ) -> String {
        format!( "{}", self.name )
    }
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

impl Generation for Function {
    //
    // Column( SqlString, length, None, None )
    //                    ^^^^^^
    //
    fn generate_rust_classes( &self ) -> String {

        let mut parsed_argument_list: String = String::from( "None" );
        let mut parsed_name: String = String::from( "None" );        

        match &self.name {
            Some( n ) => { parsed_name = format!( "{}", n ) },
            None => {}
        }

        match &self.arguments_list {
            Some( n ) => {
                
                // map through base types
                // and add "()" so it becomes
                // ie. 26 -> ( 26 )
                //
                parsed_argument_list = 
                format!( "({})", 
                         n.base_type
                        .iter()
                        .map( |x| format!( "{}", x.generate_rust_classes() ) )
                        .collect::<Vec<String>>()
                        .join( ", " ) );
            },
            None => {}
        }

        //
        // returns name + ([arguments])
        //
        format!( "{}{}", parsed_name, parsed_argument_list )
    }
}