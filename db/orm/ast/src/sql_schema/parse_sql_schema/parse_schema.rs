use sqlx::postgres::PgConnectOptions;
use sqlx::ConnectOptions;
use sqlx::PgConnection;
use sqlx::Connection;

struct Domain {
    id: i64,
    name: String
  }

#[tokio::main]
pub async fn connect() -> Result<(), Box<dyn std::error::Error>> {
    
    let db_url: &str = "postgres://postgres:Trzciano31A@db.mqifkoalnglfauiiliet.supabase.co:5432/postgres";
    
    let mut pool = PgConnection::connect("postgres://postgres:Trzciano31A@db.mqifkoalnglfauiiliet.supabase.co:5432/postgres").await?;

    let row: (String,) = sqlx::query_as("SELECT * from _prisma_migrations")
    .bind("")
    .fetch_one(&mut pool).await?;

    println!( "{:?}", row );

    Ok(())
}