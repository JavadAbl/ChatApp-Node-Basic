// types/express/index.d.ts
import "express";

/* declare module "express" {
  export interface Request {
    userId: number;
  }
} */

declare module "express-serve-static-core" {
  interface Request {
    userId: number;
  }
}
