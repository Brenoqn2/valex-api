import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import validateSchema from "../schemas/validateSchema.js";

function validateSchemaMiddleware(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const validation = validateSchema(req.body, schema);
    if (validation !== true) {
      throw {
        type: "error_schema",
        message: validation.error.details[0].message,
      };
    }

    next();
  };
}

export default validateSchemaMiddleware;
