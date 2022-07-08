import { Router } from "express";
import { createCard } from "../controllers/cardController.js";
import { apiKeyMiddleware } from "../middlewares/authMiddleware.js";
import validateSchemaMiddleware from "../middlewares/schemasMiddleware.js";
import { createSchema } from "../schemas/cardSchemas.js";

const cardRouter = Router();
cardRouter.post(
  "/card/create",
  apiKeyMiddleware,
  validateSchemaMiddleware(createSchema),
  createCard
);

export default cardRouter;
