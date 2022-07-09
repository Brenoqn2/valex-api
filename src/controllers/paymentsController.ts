import { Request, Response } from "express";
import * as paymentServices from "../services/paymentServices.js";

async function buy(req: Request, res: Response) {
  const { cardId, password, businessId, amount } = req.body;
  await paymentServices.buy(cardId, password, businessId, amount);
  res.status(200).send("Payment processed!");
}

export { buy };
