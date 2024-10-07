import { AuthController } from '../controllers/index.js';
import express from 'express';

const router = express.Router();

router.get('/signIn', AuthController.signIn);

export default router;
