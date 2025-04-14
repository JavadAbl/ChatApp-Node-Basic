/* import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
  // console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
}
 */

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
