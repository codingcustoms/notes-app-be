import mongoose from 'mongoose';

const { Schema } = mongoose;

const socialAccountSchema = new Schema(
  {
    provider: { type: String, required: true },
    providerId: { type: String, unique: true, required: true },
  },
  { timestamps: true },
);

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, sparse: true },
    password: {
      type: String,
    },
    socialAccounts: [socialAccountSchema],
  },
  { timestamps: true },
);

export const UserModel = mongoose.model('users', userSchema);
export const SocialAuthModel = mongoose.model(
  'socialAccounts',
  socialAccountSchema,
);
