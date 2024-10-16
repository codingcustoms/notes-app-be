import express from 'express';
import { notesController } from '../controllers/index.js';
import { validatorMiddleWare } from '../middlewares/index.js';
import { createNoteSchema } from '../validations/index.js';

const router = express.Router();

router.post(
  '/create-note',
  validatorMiddleWare(createNoteSchema),
  notesController.createNote,
);

export default router;
