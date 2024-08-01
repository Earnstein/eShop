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
import User from "../models/userModel";

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

export const validateId = [
  param("id").isMongoId().withMessage("Invalid ID"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequest(errors.array()[0].msg);
    }
    return next();
  },
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

export const updateUserValidator = [
  body("name").trim().optional().notEmpty().withMessage("Name is required"),
  body("email").isEmail().optional().withMessage("Email is required"),
  body("password")
    .trim()
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      return next(
        new BadRequest("At least one (name, email, password) is required")
      );
    };

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new BadRequest("Email already in use"));
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: errors.array(), status: FAILED, data: "" });
    }
    next();
  },
];
