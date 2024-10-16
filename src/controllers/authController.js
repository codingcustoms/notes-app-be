import passport from 'passport';
import { SocialAuthModel, UserModel } from '../models/index.js';
import { hashPassword } from '../utils/app.js';

export const signIn = async (req, res, next) => {
  try {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      return res.status(200).json({ err, user, info });
    })(req, res, next);
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
