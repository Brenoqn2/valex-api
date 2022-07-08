import { Request, Response } from "express";
import * as cardServices from "../services/cardServices.js";

async function createCard(req: Request, res: Response) {
  const { x_api_key } = req.headers;
  const { type, employeeId } = req.body;
  await cardServices.createCard(x_api_key, employeeId, type);
  res.status(201).send("Created!");
}

export { createCard };
