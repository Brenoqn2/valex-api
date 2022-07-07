import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;
export const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

connection.query("SELECT NOW()", (err, res) => {
  res
    ? console.log(
        `connect to database ${process.env.DATABASE_NAME} sucessfully`
      )
    : console.log(
        `failed to connect to database ${process.env.DATABASE_NAME}: ${err}`
      );
});
