import express from "express";
import { getUser, getUsers, updateUser, deleteUser, getCurrentUser } from '../controllers/user';
import { protectedRouteMiddleware, validateAdmin, validateUser } from '../middlewares/authMiddleware';
import { validateId, updateUserValidator } from '../middlewares/validators';

const userRouter = express.Router();


userRouter.get("/", protectedRouteMiddleware, validateAdmin, getUsers);
userRouter.get("/:id", validateId, protectedRouteMiddleware, validateAdmin, getUser);
userRouter.get("/current/loggedin", protectedRouteMiddleware, getCurrentUser);
userRouter.patch("/:id", validateId, updateUserValidator, protectedRouteMiddleware, validateUser, updateUser);
userRouter.delete("/:id", validateId, protectedRouteMiddleware, validateUser, deleteUser);

export default userRouter;