import Joi from 'joi';

export const createNoteSchema = Joi.object({
  title: Joi.string().strict().trim().required(),
  content: Joi.string().strict().trim().required(),
  tags: Joi.string().strict().trim(),
  isPinned: Joi.boolean(),
  userId: Joi.string().required(),
});
