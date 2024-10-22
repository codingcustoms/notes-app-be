import passport from 'passport';
import { SocialAuthModel, UserModel } from '../models/index.js';
import { hashPassword } from '../utils/app.js';
import { generateAccessToken } from '../utils/jwt.utils.js';

export const signIn = async (req, res, next) => {
  try {
    passport.authenticate('local', { session: false }, (_err, user) => {
      return res.status(200).json({ user, ...generateAccessToken(user) });
      // return res.status(200).json({ user });
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
      .json({ user: newUser, ...generateAccessToken(newUser) });
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

    if (socialAccountExists)
      return res.status(200).json({
        user: socialAccountExists,
        ...generateAccessToken(socialAccountExists),
      });

    const newUser = await UserModel.create({ ...rest });

    const newSocialAccount = await SocialAuthModel.create({
      userId: newUser._id,
      provider,
      providerId,
    });

    return res.status(201).json({
      user: newUser,
      socialAccount: newSocialAccount,
      ...generateAccessToken(newUser),
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
