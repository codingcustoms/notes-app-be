import express from 'express';
import { NotesController } from '../controllers/index.js';
import { validatorMiddleWare } from '../middlewares/index.js';
import { createNoteSchema, updateNoteSchema } from '../validations/index.js';

const router = express.Router();

router
  .route('/')
  .post(validatorMiddleWare(createNoteSchema), NotesController.createNote)
  .get(NotesController.getAllNotes);

router.get('/togglePinned/:id', NotesController.togglePinNote);

router
  .route('/:id')
  .get(NotesController.getOneNoteById)
  .patch(validatorMiddleWare(updateNoteSchema), NotesController.updateNote)
  .delete(NotesController.deleteNote);

export default router;
