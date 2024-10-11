import express from 'express';
import { validatorMiddleWare } from '../middlewares/index.js';
import { NotesModel } from '../models/notesModel.js';

const router = express.Router();

router.post('/notes', validatorMiddleWare(NotesModel));
