import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateDto(dtoClass: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);

    validate(dtoInstance).then((errors) => {
      if (errors.length > 0) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
          })),
        });
      } else {
        req.body = dtoInstance;
        next();
      }
    });
  };
}
