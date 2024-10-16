import { SocialAuthModel, UserModel } from '../models/index.js';
import { comparePassword, hashPassword } from '../utils/app.js';

export const signIn = async (req, res) => {
  try {
    const { body } = req;

    const { password, email } = body;

    const user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).send('No user found against given email!');

    if (!user.password && user.socialAccounts.length)
      return res
        .status(400)
        .send(
          'It looks like you signed up using one of the social accounts. Use the providers below to login',
        );

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
    const socialAccountExists = await SocialAuthModel.findOne({
      providerId,
      provider,
    }).populate('userId');

    if (socialAccountExists) return res.status(200).json(socialAccountExists);

    const newUser = await UserModel.create({ ...rest });

    const newSocialAccount = await SocialAuthModel.create({
      userId: newUser._id,
      provider,
      providerId,
    });

    return res
      .status(201)
      .json({ user: newUser, socialAccount: newSocialAccount });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// export const addNote = async (req, res) => {
//   const { body } = req.body;
// };
