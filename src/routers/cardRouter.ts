import { Router } from "express";
import {
  createCard,
  activateCard,
  listCards,
  getTransactions,
  blockCard,
  unBlockCard,
} from "../controllers/cardController.js";
import { apiKeyMiddleware } from "../middlewares/authMiddleware.js";
import validateSchemaMiddleware from "../middlewares/schemasMiddleware.js";
import {
  createSchema,
  activateSchema,
  listSchema,
  blockSchema,
} from "../schemas/cardSchemas.js";

const cardRouter = Router();
cardRouter.post(
  "/card/create",
  apiKeyMiddleware,
  validateSchemaMiddleware(createSchema),
  createCard
);
cardRouter.post(
  "/card/activate",
  validateSchemaMiddleware(activateSchema),
  activateCard
);
cardRouter.get("/card/transactions/:cardId", getTransactions);
cardRouter.post("/card/list", validateSchemaMiddleware(listSchema), listCards);
cardRouter.post(
  "/card/block",
  validateSchemaMiddleware(blockSchema),
  blockCard
);
cardRouter.post(
  "/card/unblock",
  validateSchemaMiddleware(blockSchema),
  unBlockCard
);

export default cardRouter;
