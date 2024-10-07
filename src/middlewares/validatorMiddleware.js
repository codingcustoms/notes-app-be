import { validateRequests } from "../utils/app.js";

export const validatorMiddleWare =
  (validationSchema, options = { warnings: true }) =>
  async (req, res, next) => {
    try {
      const validatedData = await validateRequests(
        validationSchema,
        req.body,
        options,
      );

      req.body = validatedData.value;

      next();
    } catch (e) {
      if (e.isJoi) return res.status(400).json(e.message);

      res.status(500).json(e.message);
    }
  };
