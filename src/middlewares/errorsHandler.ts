import { ErrorRequestHandler } from "express";

const errorsHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong");

  next(err);
};

export default errorsHandler;
