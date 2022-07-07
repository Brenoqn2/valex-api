import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import errorsHandler from "./middlewares/errorsHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(errorsHandler);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});