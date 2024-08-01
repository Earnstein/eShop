import User from "../models/userModel";
import { BadRequest } from '../utils/errors';
import type{ I_UserDocument } from '../models/userModel';

export const getUsersHandler = async () => {
  return await User.find({}, { password: 0 , __v: 0 , updatedAt: 0, createdAt: 0 });
};

export const getUserHandler =async (id:string) => {
  const user = await User.findOne({ _id: id }, { password: 0 , __v: 0 , updatedAt: 0, createdAt: 0 });
  if (!user) {
    throw new BadRequest("user not found");
  }
  return user;
}

export const updateUserHandler = async (id:string, body:I_UserDocument) => {
  const user = await User.findOneAndUpdate({ _id: id }, body, { new: true}).select({ password: 0 , __v: 0 , updatedAt: 0, createdAt: 0 });
  if (!user) {
    throw new BadRequest("user not found");
  }
  return user;
};

export const deleteUserHandler = async (id:string) => {
  const user = await User.findOneAndDelete({ _id: id }).select({ password: 0 , __v: 0 , updatedAt: 0, createdAt: 0 });
  if (!user) {
    throw new BadRequest("user not found");
  }
  return user;
}