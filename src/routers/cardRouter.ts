import { Router } from "express";
import { createCard, activateCard } from "../controllers/cardController.js";
import { apiKeyMiddleware } from "../middlewares/authMiddleware.js";
import validateSchemaMiddleware from "../middlewares/schemasMiddleware.js";
import { createSchema, activateSchema } from "../schemas/cardSchemas.js";

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

export default cardRouter;
