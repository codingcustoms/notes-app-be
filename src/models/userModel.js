import mongoose from "mongoose";

const { Schema } = mongoose;

const socialAccountSchema = new Schema(
  {
    provider: String,
    providerId: String,
  },
  { timestamps: true },
);

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,
    socialAccounts: [socialAccountSchema],
  },
  { timestamps: true },
);

export const UserModel = mongoose.model("user", userSchema);
