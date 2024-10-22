import passport from 'passport';
import localStrategy from 'passport-local';
import { UserModel } from '../models/index.js';
import { comparePassword } from '../utils/app.js';

passport.use(
  new localStrategy.Strategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email }).lean();

        if (!user)
          return done(null, false, {
            message: 'No user found against given email!',
          });

        if (!user.password && user.socialAccounts.length)
          return done(null, false, {
            message:
              'It looks like you signed up using one of the social accounts. Use the providers below to login',
          });

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch)
          return done(null, false, {
            message: 'Provided password is incorrect!',
          });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   const user = UserModel.find((u) => u.id === id);
//   done(null, user);
// });

export default passport;
