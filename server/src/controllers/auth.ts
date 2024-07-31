import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import { type I_UserDocument } from "../models/userModel";
import * as userService from "../services/authService";
import { SUCCESS } from "../constants";


/**
 * @desc    Auth user & get token
 * @route   POST /api/auth/signup
 * @access  Public
 */
export const signUpHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    res.status(StatusCodes.OK).json(body);
    return;
  },
);

/**
 * @desc    Auth user & get token
 * @route   POST /api/auth/signin
 * @access  Public
 */
export const signInHandler = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user: I_UserDocument = await userService.signInHandler(req.body)
    const token = userService.createToken(user);
    res.cookie(Bun.env.COOKIE_NAME!, token, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
      signed: true,
      secure: Bun.env.NODE_ENV! !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(StatusCodes.OK).json({
        message: "User logged in",
        status: SUCCESS,
        data: ""
    });
    return;
  },
);
