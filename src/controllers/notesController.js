import { NotesModel } from '../models/index.js';

export const createNote = async (req, res) => {
  const { title, content, tags } = req.body;

  const userId = req;
  console.log(userId);

  try {
    const note = await NotesModel.create({
      title,
      content,
      tags: tags || [],
      userId: userId,
    });

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const getAllNotes = async (req, res) => {
//   try {
//     const notes = await NotesModel.find({});

//     if (!notes) {
//       return res.status(404).json({ message: 'No note found!' });
//     }

//     res.status(200).json(notes);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

// export const getOneNote = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const note = await NotesModel.findById(id);

//     if (!note) {
//       return res.status(404).json({ message: 'No note found!' });
//     }

//     res.status(200).json(note);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

// export const updateNote = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const note = await NotesModel.findByIdAndUpdate(id);

//     if (!note) {
//       return res.status(404).json({ message: 'No note found!' });
//     }

//     res.status(200).json(note);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

// export const deleteNote = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const note = await NotesModel.findByIdAndDelete(id);

//     if (!note) {
//       return res.status(404).json({ message: 'No note found!' });
//     }
//     res.status(200).json({ message: 'Note delete successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };
