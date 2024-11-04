import Joi from 'joi';

export const updateUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(20).trim(),
  lastName: Joi.string().min(2).max(20).trim(),
  password: Joi.string().min(5).max(15),
});
