import jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import type { Response, Request, NextFunction } from "express";
import { UnAuthenticated } from "../utils/errors";
import User, { type I_UserDocument } from "../models/userModel";


interface CustomRequest extends Request {
  user?: I_UserDocument;
}

interface I_Payload {
  _id : string;
}


export const protectedRouteMiddleware = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const token: string = req.signedCookies[Bun.env.COOKIE_NAME!];
    if (!token || token.trim() === "") {
      throw new UnAuthenticated("user not authenticated");
    }
    try {
      const payload = <I_Payload>jwt.verify(token, Bun.env.JWT_SECRET!);
      const user = await User.findById(payload._id)
      if (!user){
        throw new UnAuthenticated("User does not exist")
      }
      req.user = user;
      next();
    } catch (error) {
      throw new UnAuthenticated("user token expired");
    }
  },
);
