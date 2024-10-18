import Joi from 'joi';

export const createNoteSchema = Joi.object({
  title: Joi.string().strict().trim().allow('', null),
  content: Joi.string().strict().trim().allow('', null),
  tags: Joi.array().items(Joi.string()),
  userId: Joi.string().required(),
}).custom((values, helpers) => {
  console.log({ values, helpers });
});
