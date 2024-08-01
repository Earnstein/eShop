import type { Request, Response, NextFunction } from "express";
import { BadRequest } from "../utils/errors";
import { StatusCodes } from "http-status-codes";
import {
  body,
  param,
  validationResult,
  type ValidationChain,
} from "express-validator";
import { FAILED } from "../constants";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: errors.array(), status: FAILED, data: "" });
    }
    return next();
  };
};

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array()[0].msg);
  }
  return next();
};

export const paramValidator = [
  param("id").isMongoId().withMessage("Invalid ID"),
];

export const signInValidator = [
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .notEmpty()
    .withMessage("Password is required"),
];

export const signUpValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  ...signInValidator,
];
