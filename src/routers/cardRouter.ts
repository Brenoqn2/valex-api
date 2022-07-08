import { Router } from "express";
import {
  createCard,
  activateCard,
  listCards,
} from "../controllers/cardController.js";
import { apiKeyMiddleware } from "../middlewares/authMiddleware.js";
import validateSchemaMiddleware from "../middlewares/schemasMiddleware.js";
import {
  createSchema,
  activateSchema,
  listSchema,
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

export default cardRouter;
