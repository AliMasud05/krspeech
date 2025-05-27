import httpStatus from "http-status";
import e, { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserServices } from "./user.service";

const registerUser = catchAsync(async (req: Request, res: Response) => {
    const { name,email, password } = req.body;
    const result = await UserServices.registerUser({name,email,password});
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: result,
    });
}
);

export const UserController = {
    registerUser,
};