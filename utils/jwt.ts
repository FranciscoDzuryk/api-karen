import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'clavesita';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export interface TokenPayload extends jwt.JwtPayload {
  id: number | string;
  email: string;
  [key: string]: any;
}

export const generateToken = (payload: Omit<TokenPayload, keyof jwt.JwtPayload>): string => {
  const options: jwt.SignOptions = {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as TokenPayload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

export default {
  generateToken,
  verifyToken,
};