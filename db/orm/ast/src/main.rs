extern crate pest;
#[macro_use]
extern crate pest_derive;

use pest::Parser;
use pest::iterators::Pairs;

#[derive(Parser)]
#[grammar = "./ident.pest"]
struct IdentParser;

static tables: &str = r"
model User {
    id        Int      @id @default(autoincrement())
    createdAt DateTime @default(now())
    email     String   @unique
    name      String?
    posts     Post[]
}
  
model Post {
    id        Int      @id @default(autoincrement())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    published Boolean  @default(false)
    title     String   @db.VarChar(255)
    author    User?    @relation(fields: [authorId], references: [id])
    authorId  Int?
}";

// fn parse_schema() {}

#[derive(Debug, Clone, PartialEq)]
struct Identifier {
    pub name: String,
}

#[derive(Debug)]
struct Model {
    pub name: Identifier
}

#[derive(Debug)]
struct BaseType {
    pub base_type: Option<String>,
    pub optional_type: Option<bool>,
    pub list_type: Option<bool>
}

use pest::iterators::Pair;
fn parse_base_type( mut pairs: Pair<'_, Rule> ) -> BaseType {

    let mut field: BaseType = BaseType {
        base_type: None,
        optional_type: None,
        list_type: None
    };

    match pairs.as_rule() {
        // get base type
        Rule::base_type => {
            field.base_type = Some(pairs.as_str().to_string());
            // println!( "{}", pairs.as_str() );
        },
        // get optional type recursively
        Rule::optional_type => {
            field.optional_type = Some( true );
            parse_base_type( pairs.into_inner().next().unwrap() );
        },
        // get list type recursively
        Rule::list_type => {
            field.list_type = Some( true );
            parse_base_type( pairs.into_inner().next().unwrap() );
        },
        _ => {}
    }
    return field
}

#[derive(Debug)]
struct FieldType {
    pub name: Option<String>,
    pub field: BaseType
}

fn parse_field_type( pairs: Pairs<'_, Rule> ) -> FieldType {

    let mut name: Option<String> = None;
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
                
                // println!(  "{}", curr.into_inner() );
            },
            Rule::identifier => {
                name = Some( curr.as_str().to_string() );
                // println!( "{:?}", curr.as_str() );
            },
            _ => {}
        }
    }
    // println!( "{:?}", field );
    return FieldType { name, field };
}

#[derive(Debug)]
struct Field {
    pub field: Vec<FieldType>
}

fn parse_field( mut pairs: Pairs<'_, Rule> ) {

    let mut field_type = Field {
        field: Vec::new()
    };

    for curr in pairs {

        match curr.as_rule() {
            Rule::field_declaration => {
                
                field_type.field.push(parse_field_type( curr.into_inner() ) );
            },
            _ => {}
        }        
    }
}

fn parse_model( pairs: Pairs<'_, Rule> ) {

    let mut name: Option<Identifier> = None;

    for curr in pairs {
        match curr.as_rule() {
            Rule::identifier => name = Some(  Identifier { 
                name: curr.as_str().to_string() 
            } ),
            // model keyword
            Rule::MODEL_KEYWORD => {
                // println!( "{:?}", curr.as_str() );
            }, 
            Rule::model_contents => {
                // println!( "{:?}", curr.into_inner() );
                parse_field( curr.into_inner() );
            }, 
            _ => {}
        }
    }

    match name {
        Some( name ) => {
            println!( "{:?}", name );
        },
        _ => {}
    }
}

fn main() {

    let pairs = IdentParser::parse(Rule::schema, tables).unwrap_or_else(|e| panic!("{}", e));

    for inner in pairs {

        for pair in inner.into_inner() {
            match pair.as_rule() {
                Rule::model_declaration => {
                    parse_model( pair.into_inner() );
                },
                _ => {}
            }
        }
    }
}
