import mongoose from 'mongoose';

const { Schema } = mongoose;

const notesSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  },
  { timestamps: true },
);

export const NotesModel = mongoose.model('notes', notesSchema);
