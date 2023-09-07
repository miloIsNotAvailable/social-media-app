pub struct SqlString {}

impl SqlString {
    pub fn to_sql() -> String {
        String::from( "TEXT" )
    }  

    pub fn length( len: u32 ) -> String {
        String::from( 
            format!( "char varying( {} )", len ) 
        )
    }

    pub fn unique( &self ) -> String {
        String::from( 
            format!( "{} {}", Self::to_sql(), "UNIQUE" ) 
        )
    }
}