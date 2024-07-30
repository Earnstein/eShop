import User, { type I_UserDocument } from "../models/userModel";
import { BadRequest, NotFound } from "../utils/errors";
import jwt from "jsonwebtoken";

interface I_SignIn {
  email: string;
  password: string;
}

export const createToken = (user: I_UserDocument) => {
  const payload = {
    _id: user._id,
    role: user.isAdmin ? "admin" : "user",
  };
  const token = jwt.sign(payload, Bun.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  return token;
};

export const signInHandler = async ({ email, password }: I_SignIn) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new NotFound("user not found");
  }
  const isPasswordCorrect = await Bun.password.verify(password, user.password);
  if (!isPasswordCorrect) {
    throw new BadRequest("password is incorrect");
  }
  return user;
};


export const getUsersHandler = async () => {
    return await User.find({})
}