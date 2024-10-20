import jwt from 'jsonwebtoken';

export const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(404).send('No auth token provided');

  const token = authHeader.split(' ')[1];

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = data;

    next();
  } catch (error) {
    res.status(400).json({ error });
  }
};
