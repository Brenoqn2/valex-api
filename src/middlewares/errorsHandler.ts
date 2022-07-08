import { ErrorRequestHandler } from "express";

const errorsHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.type === "error_not_found") return res.status(404).send(err.message);
  if (err.type === "error_conflict") return res.status(409).send(err.message);
  if (err.type === "error_schema") return res.status(422).send(err.message);
  if (err.type === "error_unathorized")
    return res.status(401).send(err.message);
  console.log(err);
  res.status(500).send("Something went wrong");

  next(err);
};

export default errorsHandler;
