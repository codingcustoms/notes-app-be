import express from 'express';
import { UserController } from '../controllers/index.js';
import { validatorMiddleWare } from '../middlewares/validatorMiddleware.js';
import { updateUserSchema } from '../validations/userValidations.js';

const router = express.Router();

router
  .route('/')
  .get(UserController.getAllUser)
  .delete(UserController.deleteUser);

router
  .route('/:id')
  .get(UserController.getUser)
  .patch(validatorMiddleWare(updateUserSchema), UserController.updateUser);

export default router;
