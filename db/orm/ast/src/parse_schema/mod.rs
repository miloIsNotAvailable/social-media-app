pub mod parse_schema_model;
pub mod parse_schema_fields;
pub mod parse_schema_field_type;
pub mod parse_schema_expression;
pub mod parse_schema_base_type;

pub mod schema {
    pub use pest::Parser;
    pub use pest::iterators::Pairs;
    pub use pest::iterators::Pair;
    
    use std::fs::File;
    use std::io::prelude::*;
    use std::fs::OpenOptions;

    use std::fmt;

    use crate::parse_schema::parse_schema_model::parse_model_schema;

    #[derive(Parser)]
    #[grammar = "./ident.pest"]
    pub struct IdentParser;
    
    pub fn parse_schema() -> std::io::Result<String> {
        let mut file = File::open("schema.prisma")?;
        let mut contents = String::new();    
        file.read_to_string(&mut contents)?;
    
        let pairs = IdentParser::parse(Rule::schema, &contents).unwrap_or_else(|e| panic!("{}", e));
    
        let mut schema_parsed: Vec<String> = vec![];
    
        for inner in pairs {
    
            for pair in inner.into_inner() {
                match pair.as_rule() {
                    Rule::model_declaration => {
                        let e = parse_model_schema::parse_model( pair.into_inner() );
                        
                        
                        let schema_as_sql = format!( "{}(\n{}\n);", e.name, e.fields );
                        // println!( "{}", schema_as_sql );
                        schema_parsed.push( schema_as_sql );
                    },
                    _ => {}
                }
            }
        }

        // responsible for uuidv4 generation
        // it also doesn't require uuid type
        // and that makes me life easier
        let custom_uuid_v4 = "CREATE OR REPLACE FUNCTION random_bytea(bytea_length integer)
        RETURNS bytea AS $body$
            SELECT decode(string_agg(lpad(to_hex(width_bucket(random(), 0, 1, 256)-1),2,'0') ,''), 'hex')
            FROM generate_series(1, $1);
        $body$
        LANGUAGE 'sql'
        VOLATILE
        SET search_path = 'pg_catalog';
        
        CREATE OR REPLACE FUNCTION uuid_v4s()
        RETURNS text AS $h1$
        DECLARE h1 bytea;
        DECLARE h2 bytea;
        DECLARE h3 bytea;
        DECLARE h4 bytea;
        DECLARE h5 bytea;
        BEGIN
            -- 1th and 2nd block are made of 6 random bytes
            h1 := random_bytea(4)::bytea;
            h2 := random_bytea(2)::bytea;
        
            -- 3th block will start with a 4 indicating the version, remaining is random
            h3 := concat('4', substr(encode(random_bytea(2), 'hex')::text, 2, 3))::bytea;
        
            -- 4th block first nibble can only be 8, 9 A or B, remaining is random
            h4 := concat(
                (floor(ascii(encode(random_bytea(1), 'escape'))::integer / 64) + 8)::text,
                substr(encode(random_bytea(2), 'hex')::text, 2, 3)
            )::bytea;
        
            -- 5th block is made of 6 random bytes
            h5 := random_bytea(6)::bytea;
        
            -- Build the complete UUID
            RETURN LOWER(concat(
                encode(h1, 'hex'), '-', encode(h2, 'hex'), '-4', encode(h3, 'hex'),
                '-', encode(h4, 'hex'), '-', encode(h5, 'hex')
            ));
        END;
        $h1$ LANGUAGE plpgsql;";

        Ok( format!( 
            "{custom_uuid_v4}\n\n{}", 
            schema_parsed.join( "\n\n" ) 
        ) )
    }
}