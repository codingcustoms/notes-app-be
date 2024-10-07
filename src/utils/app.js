import bcryptjs from "bcryptjs";

const saltRounds = 10;

export const hashPassword = async (password) => {
  return await bcryptjs.hash(password, saltRounds);
};

export const comparePassword = async (password, hash) => {
  return await bcryptjs.compare(password, hash);
};

export const validateRequests = async (schema, data, options) =>
  await schema.validateAsync(data, options);
