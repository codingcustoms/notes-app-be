import jwt from 'jsonwebtoken';

export const generateAccessToken = (data) => {
  console.log(data);
  if (!data || typeof data !== 'object') {
    throw new Error('Payload is required and must be a plain object');
  }
  const accessToken = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  return { accessToken };
};
