import { SocialAuthModel, UserModel } from '../models/index.js';
import { comparePassword, hashPassword } from '../utils/app.js';

export const signIn = async (req, res) => {
  try {
    const { body } = req;

    const { password, email } = body;

    const user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).send('No user found against given email!');

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch)
      return res.status(400).send('Provided password is incorrect!');

    return res
      .status(200)
      .json({ user, message: 'User logged in successfully!!' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const signUp = async (req, res) => {
  try {
    const { body } = req;

    const { password, ...restUser } = body;

    const userExists = await UserModel.exists({
      email: body.email,
      username: body.username,
    });

    if (userExists)
      return res
        .status(400)
        .send('User already exists against given email or username');

    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
      ...restUser,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ user: newUser, message: 'User signed up successfully!!' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const socialAuth = async (req, res) => {
  try {
    const { body } = req;
    const { provider, providerId, ...rest } = body;

    // https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/
    const accountExists = await UserModel.findOne({
      email: rest.email,
    })
      .where('socialAccounts')
      .elemMatch({ providerId });

    if (accountExists) return res.status(200).json(accountExists);

    const newUser = await UserModel({ ...rest });

    const newSocialAccount = await SocialAuthModel.create({
      provider,
      providerId,
    });

    newUser.socialAccounts.push(newSocialAccount);

    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// export const addNote = async (req, res) => {
//   const { body } = req.body;
// };
