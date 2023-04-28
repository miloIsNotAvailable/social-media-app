use postgres::Client;
use futures::executor::block_on;
use openssl::ssl::SslMethod;
use postgres_openssl::MakeTlsConnector;
use openssl::ssl::{SslConnector, SslVerifyMode};

fn select( pg_client: &mut postgres::Client ) {
    
    let res = pg_client.query_one( "SELECT * from Item;", &[] )
    .expect("failed to query item");

    let e: String = res.get( 0 ); 
}

// pub fn connect() {

//     let mut builder = SslConnector::builder(SslMethod::tls()).unwrap();
    
//     // builder.set_ca_file("./src/sql_schema/parse_sql_schema/prod-ca-2021.pem").unwrap();
//     // builder.set_verify( SslVerifyMode::NONE );
    
//     let connector = MakeTlsConnector::new( builder.build() );

//     let mut client = postgres::Client::connect(
//         "host=db.mqifkoalnglfauiiliet.supabase.co port=5432 password=Trzciano31A user=postgres",
//         connector
//     ).expect("failed to connect to postgres");
    
//     println!( "hey" );
//     select( &mut client );
// }

use std::io::prelude::*;
use std::net::TcpStream;
use std::process::Command;

pub fn connect() {
    let mut stream = TcpStream::connect("db.mqifkoalnglfauiiliet.supabase.co:5432");
    
    match stream {
        Ok( mut v ) => {
            println!( "{v:?}" );
            
            let pwd = "Trzciano31A";
            let command = "select * from Item;";

            let w = v.write( &pwd.as_bytes() );
            let res = v.read_to_string( &command.as_bytes() );

            println!( "{:?}", res.expect( "ay" ) );
        },
        Err( e ) => println!( "{e:?}" ),
    }
    
    
    // let mut stream_clone = stream.try_clone().expect("clone failed...");
    // let e = stream_clone.read( &mut [0; 128] ).expect("REASON");

    // match e {
    //     Ok( ref a ) => println!( "{a:?}" ),
    //     Err( ref b ) => println!( "{b:?}" ),
    // }

    // println!( "{:?}", e );
} 