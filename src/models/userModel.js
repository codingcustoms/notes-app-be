import mongoose from "mongoose";

const { Schema } = mongoose;

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

const socialAccountSchema = new Schema(
  {
    provider: String,
    providerId: String,
  },
  { timestamps: true },
);

export const UserSchema = mongoose.model("user", userSchema);