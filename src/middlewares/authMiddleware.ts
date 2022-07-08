import { Request, Response, NextFunction } from "express";

function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const { x_api_key } = req.headers;
  if (!x_api_key) {
    throw { type: "error_unathorized", message: "No API key provided" };
  }
  next();
}

export { apiKeyMiddleware };
