import { UserModel } from '../models/index.js';

export const getUser = async (req, res) => {
  const userId = req.params.id;
  console.log({ userId });
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, password } = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { firstName, lastName, password },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
