import { Request, Response } from "express";
import * as rechargeServices from "../services/rechargeServices.js";

async function rechargeCard(req: Request, res: Response) {
  const { x_api_key } = req.headers;
  const { cardId, amount } = req.body;
  await rechargeServices.rechargeCard(cardId, amount, String(x_api_key));
  res.status(200).send("Recharged!");
}

export { rechargeCard };
