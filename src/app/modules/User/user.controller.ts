import httpStatus from "http-status";
import e, { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserServices } from "./user.service";

const registerUser = catchAsync(async (req: Request, res: Response) => {
    const { first_name, last_name, email, password, ...addressFields } = req.body;
    
    const result = await UserServices.registerUser({
        first_name,
        last_name,
        email,
        password,
        ...addressFields
    });
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: result,
    });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await UserServices.getAllUsers();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
});

export const UserController = {
    registerUser,
    getAllUsers
};