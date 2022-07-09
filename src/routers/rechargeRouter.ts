import { Router } from "express";
import { rechargeCard } from "../controllers/rechargeController.js";
import { apiKeyMiddleware } from "../middlewares/authMiddleware.js";
import validateSchemaMiddleware from "../middlewares/schemasMiddleware.js";
import { rechargeCardSchema } from "../schemas/rechargeSchemas.js";

const rechargeRouter = Router();

rechargeRouter.post(
  "/recharge",
  apiKeyMiddleware,
  validateSchemaMiddleware(rechargeCardSchema),
  rechargeCard
);

export default rechargeRouter;
