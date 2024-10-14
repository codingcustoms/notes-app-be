import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { AuthRoutes } from '../routes/index.js';

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT ?? 3000;

// health check
app.get('/', (req, res) => {
  return res.send('App is up and running!');
});

// routes
app.use('/auth', AuthRoutes);

app.listen(port, () => {
  console.log(`Api listening on port ${port}`);
});
