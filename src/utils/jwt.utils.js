import jwt from 'jsonwebtoken';

export const generateAccessToken = (data) => {
  const accessToken = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  return { accessToken };
};
