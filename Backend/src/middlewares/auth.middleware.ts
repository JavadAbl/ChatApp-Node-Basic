import { AppError } from "#helpers/AppError.js";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import status from "http-status";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Add authentication logic here
  const token = req.cookies?.token;
  if (!token) throw new AppError(status.UNAUTHORIZED, "No token provided");

  // Verify the token and extract user information
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  // Verify the token and extract user information
  jwt.verify(token, secret, (err: unknown, decoded: unknown) => {
    if (err) throw err;

    // Access the user ID from the decoded payload
    const tokenPayload = decoded as JwtPayload & { id: number };
    req.userId = tokenPayload.id;
    next();
  });
}
