import express from "express";

import BookController from "../controllers/book.js";

const router = express.Router();

router.get("/books", BookController.getAllBooks);

export default router;