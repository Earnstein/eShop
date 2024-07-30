import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFound } from "../utils/errors";
import asyncHandler from "express-async-handler";
import * as userService from "../services/userService"
import { getUsersHandler } from '../services/userService';

export const getUsers = asyncHandler(
    async (req:Request, res:Response): Promise<void> =>{
        const users = await userService.getUsersHandler()
        res.status(StatusCodes.OK).json(users)
        return;
})