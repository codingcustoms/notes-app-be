import Joi from 'joi';

const email = Joi.string().email().trim();
const password = Joi.string().alphanum().trim().min(5).max(15);

export const signInSchema = Joi.object({
  email,
  password,
})
  .options({ presence: 'required' })
  .required();

export const signUpSchema = Joi.object({
  firstName: Joi.string().strict().trim(),
  lastName: Joi.string().strict().trim(),
  username: Joi.string().strict().trim(),
  email,
  password,
})
  .options({ presence: 'required' })
  .required();

export const socialSchema = Joi.object({
  firstName: Joi.string().strict().trim(),
  lastName: Joi.string().strict().trim(),
  provider: Joi.string().trim(),
  providerId: Joi.string().trim(),
  email,
})
  .options({ presence: 'required' })
  .required();
