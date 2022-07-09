import { Router } from "express";
import {
  createCard,
  activateCard,
  listCards,
  blockCard,
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
cardRouter.post("/card/list", validateSchemaMiddleware(listSchema), listCards);
cardRouter.post(
  "/card/block",
  validateSchemaMiddleware(blockSchema),
  blockCard
);

export default cardRouter;
