#[cfg(test)]
mod tests {
    use crate::parse_schema as schema_parser;
    use super::*;

    #[test]
    fn match_tables_primary_key_uuid() {

        match schema_parser::schema::parse_schema( "tests/schema.prisma" ) {
            Ok( (uuids, schema__) ) => {

                if !schema__.contains( "id text not null default uuid_v4s()" ) {
                    panic!();
                }
            },
            Err( err ) => {}
        }
    }

    #[test]
    fn match_tables_primary_key_serial() {
        match schema_parser::schema::parse_schema( "tests/schema.prisma" ) {
            Ok( (uuids, schema__) ) => {

                if !schema__.contains( "id serial not null default 0" ) {
                    panic!();
                }
            },
            Err( err ) => {}
        }
    }

    #[test]
    fn match_tables_relation() {

        match schema_parser::schema::parse_schema( "tests/schema_1.prisma" ) {
            Ok( (uuids, schema__) ) => {

                assert!(schema__.contains( "unique(email)" ) );
                assert!(schema__.contains( "foreign key(authorId)" ) );
                assert!(schema__.contains( "primary key(id)" ) );
            },
            Err( err ) => {}
        }
    }
}