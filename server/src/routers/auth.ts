import express from "express";
import { signInHandler } from "../controllers/auth";
import { validate, loginValidator } from '../middlewares/validators';

const authRouter = express.Router();

authRouter.post("/signin", validate(loginValidator), signInHandler);

export default authRouter;