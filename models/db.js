import pgk from "pg";
const { Client } = pgk;


export default class DB {
    static getAllBooks = async () => {
      try {
        const client = new Client({
          host: "localhost",
          port: 5432,
          user: "postgres",
          password: "21020",
          database: "library",
        });
        await client.connect();
        const res = await client.query(`select * from public.books`);
        var books = res.rows;
        await client.end();
        return books;
      } catch (error) {
        console.log(error);
      }
    };
}