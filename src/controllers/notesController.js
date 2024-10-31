import { NotesModel } from '../models/index.js';

// create note API
export const createNote = async (req, res) => {
  const { title, content, tags } = req.body;

  const userId = req.user._id;

  try {
    const note = await NotesModel.create({
      title,
      content,
      tags: tags,
      userId: userId,
    });

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// get all notes API
export const getAllNotes = async (req, res) => {
  const userId = req.user._id;

  try {
    const notes = await NotesModel.find({ userId, deletedAt: null }).sort({
      updatedAt: 'desc',
    });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// get single notes API
export const getOneNoteById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const note = await NotesModel.findOne({ _id: id, userId });
    if (!note) {
      return res.status(404).json({ message: 'No note found' });
    }
    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// update notes API
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { title, content, tags, isPinned } = req.body;

  try {
    const note = await NotesModel.findByIdAndUpdate(
      { _id: id, userId },
      { title, content, tags, isPinned },
      { new: true },
    );

    if (!note) {
      return res.status(404).json({ message: 'No note found' });
    }

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// soft delete note API
export const softDeleteNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const note = await NotesModel.findOne({ _id: id, userId });

    if (!note) {
      return res.status(404).json({ message: 'No note found' });
    }

    note.deletedAt = new Date();
    await note.save();

    return res.status(200).json({ note, message: 'Note moved to trash' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// delete note API
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const note = await NotesModel.findOneAndDelete({
      _id: id,
      userId,
      deletedAt: { $ne: null },
    });

    if (!note) {
      return res.status(404).json({ message: 'No note found in trash' });
    }

    return res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// pin/unpin note API
export const togglePinNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const note = await NotesModel.findOne({ _id: id, userId });

    if (!note) {
      return res.status(404).json({ message: 'No note found' });
    }

    note.isPinned = !note.isPinned;

    note.save();

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).send(error);
  }
};
