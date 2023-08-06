import path from "path";
import { fileURLToPath } from "url";

import DB from "../models/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default class BookController {
    static getAllBooks = async (req, res) => {
      try {
        const books = await DB.getAllBooks();
        res.json({
          success: true,
          body: books,
          message: "All books fethced",
        });
      } catch (e) {
        res.status(500).json({
          success: false,
          body: null,
          message: "Internal Server Error",
        });
      }
    };
}