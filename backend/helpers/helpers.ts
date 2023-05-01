import crypto from 'crypto';

export const getDbUrl = (): string => {
  const dBUrl = process.env.DB_URL_DEV; // For curren working DB use process.env.DB_URL
  if (!dBUrl) {
    throw new Error('Missing database url');
    process.exit(1);
  }
  return dBUrl;
};

export const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('Missing JWT secret key');
    process.exit(1);
  }
  return secret;
};

const getSalt = (): string => {
  const salt = process.env.HASH_SALT;
  if (!salt) {
    console.error('Missing salt for hashing password');
    process.exit(1);
  }
  return salt;
};

export const hashPassword = (password: string): string => {
  return crypto.pbkdf2Sync(password, getSalt(), 16, 64, 'sha512').toString('hex');
};
