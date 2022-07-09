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

async function listCards(req: Request, res: Response) {
  const { employeeId, passwords } = req.body;
  const cards = await cardServices.listCards(employeeId, passwords);
  res.status(200).send({ cards: cards });
}

async function blockCard(req: Request, res: Response) {
  const { cardId, password } = req.body;
  await cardServices.blockCard(cardId, password);
  res.status(200).send("Blocked!");
}

export { createCard, activateCard, listCards, blockCard };
