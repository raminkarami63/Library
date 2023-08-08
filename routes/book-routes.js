import express from "express";

import BookController from "../controllers/book.js";

const router = express.Router();

router.get("/books", BookController.getAllBooks);
router.get("/books/:id", BookController.getBookById);

export default router;