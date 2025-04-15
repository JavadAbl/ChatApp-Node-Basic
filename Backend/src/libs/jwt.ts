import jwt from "jsonwebtoken";

export function generateToken(id: number): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign({ id }, secret, {});
  return token;
}
