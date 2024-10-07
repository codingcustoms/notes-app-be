import { UserModel } from "../models/index.js";
import { comparePassword } from "../utils/app.js";

export const signIn = async (req, res) => {
  try {
    const { body } = req;

    const { password, email } = body;

    const user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).send("No user found against given email!");

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch)
      return res.status(400).send("Provided password is incorrect!");

    return res
      .status(200)
      .json({ user, message: "User logged in successfully!!" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
