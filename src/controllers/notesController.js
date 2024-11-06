import { NotesModel } from '../models/index.js';
import { calculatePaginationProps, calculateSkip } from '../utils/app.js';

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
  try {
    const userId = req.user._id;
    const search = req.query?.search ?? '';
    const page = req.query?.page ?? 1;
    const limit = req.query?.limit ?? 10;

    const notes = await NotesModel.find({
      userId,
      deletedAt: null,
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $elemMatch: { $regex: search, $options: 'i' } } },
      ],
    })
      .sort({
        updatedAt: 'desc',
      })
      .skip(calculateSkip(page, limit))
      .limit(limit);

    const count = await NotesModel.countDocuments({ userId, deletedAt: null });

    return res
      .status(200)
      .json({ notes, ...calculatePaginationProps(count, limit) });
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
  const { title, content, tags } = req.body;

  try {
    const note = await NotesModel.findByIdAndUpdate(
      { _id: id, userId },
      { title, content, tags },
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

// delete note API
export const deleteNote = async (req, res) => {
  const query = req.query;
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const note = await NotesModel.findOne({
      _id: id,
      userId,
    });

    if (!note) {
      return res.status(404).json({ message: 'No note found' });
    }

    if (query?.permanent) await NotesModel.deleteOne({ _id: id, userId });
    else {
      note.deletedAt = new Date();
      await note.save();
    }

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// // delete note API
// export const deleteNote = async (req, res) => {
//   const { id } = req.params;
//   const userId = req.user._id;

//   try {
//     const note = await NotesModel.findOneAndDelete({
//       _id: id,
//       userId,
//       deletedAt: { $ne: null },
//     });

//     if (!note) {
//       return res.status(404).json({ message: 'No note found in trash' });
//     }

//     return res.status(200).json({ message: 'Note deleted successfully' });
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// };

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
