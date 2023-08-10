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

    static getBookById = async (req, res) => {
      try {
        const book = await DB.getBookById(req.params.id);
        if (book) {
          res.json({
            success: true,
            body: book,
            message: "The book fetched successfully",
          });
        } else {
          res.status(404).json({
            success: false,
            body: null,
            message: "book not found",
          });
        }
      } catch (e) {
        res.status(500).json({
          success: false,
          body: null,
          message: "Internal Server Error",
        });
      }
    };

    static addBook = async (req, res) => {
      if (req.body.title && req.body.author) {
        const title = req.body.title;
        const author = req.body.author;
        try {
          const book = await DB.addBook(title, author);
          res.status(201).json({
            success: true,
            body: null,
            message: "Book created",
          });
        } catch (e) {
          res.status(500).json({
            success: false,
            body: null,
            message: "Internal Server Error",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          body: null,
          message: "Please send new book title",
        });
      }
    };

    static updateBook = async (req, res) => {
      if (
        req.body.members_id &&
        req.body.date_of_borrow!== undefined
      ) {
        const { members_id, date_of_borrow } = req.body;
        const id = req.params.id;
  
        const book = await DB.getBookById(id);
        if (book) {
          try {
            await DB.updateBook(members_id, date_of_borrow, id);
            res.json({
              success: true,
              body: null,
              message: "Book updated",
            });
          } catch (e) {
            res.status(500).json({
              success: false,
              body: null,
              message: "Internal Server Error",
            });
          }
        } else {
          res.status(404).json({
            success: false,
            body: null,
            message: "Book not found",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          body: null,
          message: "Please provide 'members_id', 'date_of_borrow'",
        });
      }
    };

    static deleteBook(req, res) {
      try {
        if (DB.deleteBook(req.params.id)) {
          res.json({
            success: true,
            body: null,
            message: "The book deleted",
          });
        } else {
          res.status(404).json({
            success: false,
            body: null,
            message: "book not found",
          });
        }
      } catch (e) {
        res.status(500).json({
          success: false,
          body: null,
          message: "Internal Server Error",
        });
      }
    }
}