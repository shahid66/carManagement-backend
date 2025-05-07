import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string // keep it as string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn as SignOptions["expiresIn"], // ✅ this line fixes the type
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
