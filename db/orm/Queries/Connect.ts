import { Client } from 'pg'

export class Connect {
    connect = async(): Promise<Client> => {
        console.log( 'postgress server running on -> ' + '\x1b[36m%s\x1b[0m', process.env.DATABASE_URL )

        const client = new Client( "postgresql://postgres:Trzciano31A@db.pwfvdtvduwysiswsbyio.supabase.co:5432/postgres" );
        
        (async () => {
          await client.connect();
          try {
            const results = await client.query("SELECT NOW()");
            // console.log(results.rows);
          } catch (err) {
            console.error("error executing query:", err);
          } finally {
            client.end();
          }
        })();
    
        return client
    }
}