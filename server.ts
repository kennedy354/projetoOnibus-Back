import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import router from "./src/routes/routes";
import cors from "cors";
import dotenv from "dotenv";

const app: Express = express();
const port = 8080;

dotenv.config();
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(router);

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => {
    app.listen(port, () => {
      console.log(`O servidor está no link http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
