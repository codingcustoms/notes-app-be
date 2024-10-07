import Joi from 'joi';

const email = Joi.string().email().trim().required();
const password = Joi.string().alphanum().trim().min(5).max(15).required();

export const signInSchema = Joi.object({
  email,
  password,
});

export const signUpSchema = Joi.object({
  fullName: Joi.string().strict().trim().required(),
  email,
  password,
});
