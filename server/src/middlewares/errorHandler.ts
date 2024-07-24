import { MongooseError } from "mongoose";
import type { Request, Response, NextFunction } from "express";
import {
  BadRequest,
  NotFound,
  Forbidden,
  UnAuthorized,
  UnAuthenticated,
  NoContent,
} from "../utils/errors";

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MongooseError && err.name === "CastError") {
    err = new BadRequest("Invalid id");
  }

  if (
    err instanceof NotFound ||
    err instanceof BadRequest ||
    err instanceof Forbidden ||
    err instanceof UnAuthenticated ||
    err instanceof NoContent ||
    err instanceof UnAuthenticated
  ) {
    res.status(err.statusCode).json({
      message: err.message,
      status: err.name,
    });
    return;
  }

  next(err);
};