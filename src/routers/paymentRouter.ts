import { Router } from "express";
import { buy } from "../controllers/paymentsController.js";
import schemasMiddleware from "../middlewares/schemasMiddleware.js";
import { buySchema } from "../schemas/paymentSchemas.js";

const paymentRouter = Router();

paymentRouter.post("/payment", schemasMiddleware(buySchema), buy);

export default paymentRouter;
