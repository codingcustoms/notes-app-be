import express from 'express';
import { NotesController } from '../controllers/index.js';
import { validatorMiddleWare } from '../middlewares/index.js';
import { createNoteSchema } from '../validations/index.js';

const router = express.Router();

router.post(
  '/create-note',
  validatorMiddleWare(createNoteSchema),
  NotesController.createNote,
);

export default router;
