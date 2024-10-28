import Bun from "bun";
import asyncHandler from "express-async-handler";
import type { Response, Request, NextFunction } from "express";
import { UnAuthorized, Forbidden } from "../utils/errors";
import User, { type I_UserDocument } from "../models/userModel";
import jwt from "jsonwebtoken";
import * as mongoose from "mongoose";

export interface CustomRequest extends Request {
  user?: I_UserDocument;
}

interface I_Payload {
  _id: string;
}

export const protectedRouteMiddleware = asyncHandler(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token: string = req.signedCookies[Bun.env.COOKIE_NAME!];
    if (!token || token.trim() === "") {
      throw new UnAuthorized("user not authenticated");
    }
    try {
      const payload = <I_Payload>jwt.verify(token, Bun.env.JWT_SECRET!);
      const user = await User.findById(
        { _id: payload._id },
        {
          _id: 1,
          isAdmin: 1,
        }
      );
      if (!user) {
        throw new UnAuthorized("User does not exist");
      }
      req.user = user;
      next();
    } catch (error) {
      throw new UnAuthorized("user token expired");
    }
  }
);

/**
 * Middleware to validate if the user has admin permissions.
 * This function checks if the authenticated user is an admin.
 * If not, a Forbidden error is thrown.
 *
 * @param req - Express request object, extended with a user property.
 * @param res - Express response object.
 * @param next - Express next function to pass control to the next middleware.
 *
 * @throws {Forbidden} If the user is not an admin.
 */
export const validateAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnAuthorized("user not authenticated");
  }

  if (!req.user.isAdmin) {
    throw new Forbidden("permission denied");
  }
  next();
};

/**
 * Middleware to validate if the user has permission to access the route.
 * This function checks if the authenticated user is either an admin or
 * the user corresponding to the ID in the request parameters. If neither
 * condition is met, a Forbidden error is thrown.
 *
 * @param req - Express request object, extended with a user property.
 * @param res - Express response object.
 * @param next - Express next function to pass control to the next middleware.
 *
 * @throws {Forbidden} If the user is not the owner of the resource or an admin.
 */
export const validateUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userId = req.user?._id as mongoose.ObjectId;
  const isUser = new mongoose.Types.ObjectId(id).equals(userId.toString());
  const isAdmin = req.user?.isAdmin;
  if (!isAdmin && !isUser) {
    throw new Forbidden("permission denied");
  }
  next();
};
