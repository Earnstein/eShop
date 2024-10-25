import Bun from "bun";
import User, { type I_UserDocument } from "../models/userModel";
import { BadRequest, NotFound } from "../utils/errors";
import jwt from "jsonwebtoken";

interface I_SignIn {
  email: string;
  password: string;
}

export const createToken = (user: I_UserDocument) => {
  const payload = {
    _id: user._id as string,
  };
  console.log(Bun.env.JWT_SECRET!);
  const token = jwt.sign(payload, Bun.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  return token;
};

export const signUpHandler = async (user: I_UserDocument) => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new BadRequest("user with email already exists");
  }
  const newUser = await User.create({
    ...user,
  });
  return newUser;
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
