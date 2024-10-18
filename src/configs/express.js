import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { AuthRoutes, NoteRoutes } from '../routes/index.js';
import passport from './passport.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const port = process.env.PORT ?? 3000;

// health check
app.get('/', (req, res) => {
  return res.send('App is up and running!');
});

// routes
app.use('/auth', AuthRoutes);
app.use('/notes', NoteRoutes);

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
