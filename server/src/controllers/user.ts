import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import * as userService from "../services/userService";
import type { I_UserDocument } from "../models/userModel";
import { SUCCESS } from "../constants";

export const getUsers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const users = await userService.getUsersHandler();
    res.status(StatusCodes.OK).json({
      message: "All users",
      status: SUCCESS,
      data: users,
    });
    return;
  }
);

export const getUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user: I_UserDocument = await userService.getUserHandler(id);
    res.status(StatusCodes.OK).json({
      message: "user found",
      status: SUCCESS,
      data: user,
    });
    return;
  }
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await userService.updateUserHandler(id, req.body);
    res.status(StatusCodes.OK).json({
      message: "user updated",
      status: SUCCESS,
      data: user,
    });
    return;
  }
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await userService.deleteUserHandler(id);
    res.status(StatusCodes.OK).json({
      message: "user deleted",
      status: SUCCESS,
      data: user,
    });
    return;
  }
);
