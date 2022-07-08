import { Request, Response } from "express";
import * as cardServices from "../services/cardServices.js";

async function createCard(req: Request, res: Response) {
  const { x_api_key } = req.headers;
  const { type, employeeId } = req.body;
  await cardServices.createCard(x_api_key, employeeId, type);
  res.status(201).send("Created!");
}

async function activateCard(req: Request, res: Response) {
  const { cardId, cvc, password } = req.body;
  await cardServices.activateCard(cardId, cvc, password);
  res.status(200).send("Activated!");
}

export { createCard, activateCard };
