import { MongooseError } from "mongoose";
import type { Request, Response, NextFunction } from "express";
import {
  BadRequest,
  NotFound,
  Forbidden,
  UnAuthorized,
  NoContent,
} from "../utils/errors";
import { FAILED } from "../constants";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MongooseError && err.name === "CastError") {
    err = new BadRequest("Invalid id");
    return;
  }

  if (
    err instanceof NotFound ||
    err instanceof BadRequest ||
    err instanceof Forbidden ||
    err instanceof NoContent ||
    err instanceof UnAuthorized
  ) {
    res.status(err.statusCode).json({
      message: err.message,
      status: FAILED,
      data: "",
    });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    status: FAILED,
    data: "",
  });

  next(err);
};
