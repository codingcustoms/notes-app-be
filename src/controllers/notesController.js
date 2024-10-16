import { NotesModel } from '../models/index.js';

export const createNote = async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const newNote = await NotesModel.create({
      title,
      content,
      tags: tags || [],
    });

    return res.status(200).json(newNote);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateNote = async (req, res) => {};
