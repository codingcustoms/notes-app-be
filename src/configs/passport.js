import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import localStrategy from 'passport-local';
import { SocialAuthModel, UserModel } from '../models/index.js';
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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        'http://localhost:8000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the social account already exists
        let socialAccount = await SocialAuthModel.findOne({
          providerId: profile.id,
        }).populate('userId');

        // Create a new user if not found
        if (!socialAccount) {
          const newUser = await UserModel.create({
            email: profile.emails[0].value,
          });

          // Create the social account entry linked to the user
          socialAccount = await SocialAuthModel.create({
            userId: newUser._id,
            provider: 'google',
            providerId: profile.id,
          });
        }

        return done(null, socialAccount);
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
