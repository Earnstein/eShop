import Bun from "bun";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import { type I_UserDocument } from "../models/userModel";
import * as authService from "../services/authService";
import { SUCCESS } from "../constants";

/**
 * @desc    Auth user & sign up
 * @route   POST /api/auth/signup
 * @access  Public
 */
export const signUpHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user: I_UserDocument = await authService.signUpHandler(req.body);
    res.status(StatusCodes.OK).json({
      message: "User created",
      status: SUCCESS,
      data: user,
    });
    return;
  }
);

/**
 * @desc    Auth user & sign in
 * @route   POST /api/auth/signin
 * @access  Public
 */
export const signInHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user: I_UserDocument = await authService.signInHandler(req.body);
    const token = authService.createToken(user);
    console.log(user);
    res.cookie(Bun.env.COOKIE_NAME!, token, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
      signed: true,
      secure: Bun.env.NODE_ENV! !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(StatusCodes.OK).json({
      message: "user logged in",
      status: SUCCESS,
      data: "",
    });
    return;
  }
);

/**
 * @desc    Auth user & sign out
 * @route   POST /api/auth/signout
 * @access  Public
 */
export const signOutHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.clearCookie(Bun.env.COOKIE_NAME!);
    res.status(StatusCodes.OK).json({
      message: "user logged out",
      status: SUCCESS,
      data: "",
    });
  }
);
