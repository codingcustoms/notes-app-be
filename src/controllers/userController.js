import { UserModel } from '../models/index.js';

// get all users
export const getAllUser = async (req, res) => {
  try {
    const user = await UserModel.find({});

    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// get user
export const getUser = async (req, res) => {
  const userId = req.params.id;
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

//update user
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

// // soft delete user
// export const softDeleteUser = async (req, res) => {
//   const userId = req.user._id;

//   try {
//     const user = await UserModel.findOne({
//       _id: userId,
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'No user found' });
//     }

//     user.deletedAt = new Date();
//     await user.save();

//     return res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// };

// delete user
export const deleteUser = async (req, res) => {
  const query = req.query;
  const userId = req.user._id;

  try {
    const user = await UserModel.findOne({
      _id: userId,
      // https://www.mongodb.com/docs/manual/reference/operator/query/ne/
      deletedAt: { $ne: null },
    });

    if (!user) {
      return res.status(404).json({ message: 'No user found' });
    }

    if (query?.permanent) await UserModel.deleteOne({ _id: userId });
    else {
      user.deletedAt = new Date();
      await user.save();
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).send(error);
  }
};
