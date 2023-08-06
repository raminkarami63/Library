import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import "dotenv/config";

import bookRoutes from "./routes/book-routes.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});


app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.use(bookRoutes);

app.listen(3000);