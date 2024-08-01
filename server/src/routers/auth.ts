import express from "express";
import { signInHandler, signOutHandler, signUpHandler } from '../controllers/auth';
import { validate, signInValidator, signUpValidator } from '../middlewares/validators';

const authRouter = express.Router();
authRouter.post("/signup", validate(signUpValidator),signUpHandler);
authRouter.post("/signin", validate(signInValidator), signInHandler);
authRouter.get("/signout", signOutHandler);

export default authRouter;