import passport from 'passport';
import { UserModel } from '../models/index.js';
import { hashPassword } from '../utils/app.js';
import { generateAccessToken } from '../utils/jwt.utils.js';

export const signIn = async (req, res, next) => {
  try {
    passport.authenticate('local', { session: false }, (_err, user) => {
      return res.status(200).json({ user, ...generateAccessToken(user) });
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

export const socialAuth = async (req, res, next) => {
  try {
    const { body } = req;
    console.log(body);

    passport.authenticate('google', { session: false }, (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Authentication error', error: err });
      }
      if (!user) {
        return res.status(400).json({ message: 'User not authenticated' });
      }

      const tokenData = generateAccessToken(user);

      return res.status(200).json({ user, ...tokenData });
    })(req, res, next);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// export const socialAuth = async (req, res, next) => {
//   try {
//     passport.authenticate(
//       'google',
//       { scope: ['profile', 'email'] },
//       (err, user) => {
//         if (err) return res.status(500).json(err);
//         if (!user)
//           return res.status(400).json({ message: 'User not authenticated' });

//         return res.status(200).json({ user, ...generateAccessToken(user) });
//       },
//     )(req, res, next);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };
