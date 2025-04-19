// middlewares/validate.ts
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateDtoMiddleware(dtoClass: any, source: "body" | "params" | "query" = "body") {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dtoClass, req[source]);
    const errors = await validate(instance, { whitelist: true });

    if (errors.length > 0) {
      res.status(400).json({
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });

      return;
    }

    req[source] = instance;
    next();
  };
}
