import bcryptjs from 'bcryptjs';

const saltRounds = 10;

export const hashPassword = async (password) => {
  return await bcryptjs.hash(password, saltRounds);
};

export const comparePassword = async (password, hash) => {
  return await bcryptjs.compare(password, hash);
};

export const validateRequests = async (schema, data, options) =>
  await schema.validateAsync(data, options);

export const calculateSkip = (page, limit) =>
  ((page <= 0 ? 1 : page) - 1) * limit;

export const calculatePaginationProps = (count, limit) => {
  const totalPages = Math.ceil(count / limit);

  return { totalItems: count, totalPages };
};
