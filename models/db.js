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

    static getBookById = async (id) => {
      try {
        const client = new Client({
          host: "localhost",
          port: 5432,
          user: "postgres",
          password: "21020",
          database: "library",
        });
        await client.connect();
        const res = await client.query(
          `SELECT * FROM public.books WHERE id = ${id}`
        );
        var book = res.rows;
        await client.end();
        return book;
      } catch (error) {
        console.log(error);
      }
    };

    static addBook = async (title, author) => {
      try {
        const client = new Client({
          host: "localhost",
          port: 5432,
          user: "postgres",
          password: "21020",
          database: "library",
        });
        const qr = `INSERT INTO public.books VALUES (DEFAULT, '${title}', '${author}')`;
        await client.connect();
        const res = await client.query(qr);
        await client.end();
        return true;
      } catch (error) {
        console.log(error);
      }
    };

    static updateBook = async (members_id, date_of_borrow, id) => {
      try {
        const client = new Client({
          host: "localhost",
          port: 5432,
          user: "postgres",
          password: "21020",
          database: "library",
        });

        await client.connect();
        client.query(
          `UPDATE public.books SET "members_id"='${members_id}', "date_of_borrow"='${date_of_borrow}' WHERE id=${id}`,
          (err, res) => {
            client.end();
            return true;
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
}