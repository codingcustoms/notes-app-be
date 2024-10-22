import express from 'express';
import { notesController } from '../controllers/index.js';
import { validatorMiddleWare } from '../middlewares/index.js';
import { createNoteSchema, updateNoteSchema } from '../validations/index.js';

const router = express.Router();

router.post(
  '/create-note',
  validatorMiddleWare(createNoteSchema),
  notesController.createNote,
);
router.get(
  '/update-note/:id',
  validatorMiddleWare(updateNoteSchema),
  notesController.updateNote,
);
router.get('/all-notes', notesController.getAllNotes);
router.get('/get-note/:id', notesController.getOneNoteById);
router.delete('/delete-note/:id', notesController.deleteNote);

export default router;
