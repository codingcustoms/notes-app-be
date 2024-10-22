import Joi from 'joi';

export const createNoteSchema = Joi.object({
  title: Joi.string().strict().trim().allow('', null),
  content: Joi.string().strict().trim().allow('', null),
  tags: Joi.array().items(Joi.string()).default([]),
}).custom((values, helpers) => {
  // console.log({ values, helpers });
  if (!values.title && !values.content) {
    return helpers.message('Either title or content must be provided.');
  }
  return values;
});

export const updateNoteSchema = Joi.object({
  title: Joi.string().strict().trim().allow('', null),
  content: Joi.string().strict().trim().allow('', null),
  tags: Joi.array().items(Joi.string()).default([]),
}).custom((values, helpers) => {
  if (!values.title && !values.content && values.tags.length === 0) {
    return helpers.message(
      'At least one of title, content, or tags must be provided.',
    );
  }
  return values;
});
