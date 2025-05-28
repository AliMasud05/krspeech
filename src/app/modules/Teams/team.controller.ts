import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TeamServices } from "./team.service";

const createTeam = catchAsync(async (req: Request, res: Response) => {
    const { name, description, designation, image } = req.body;
    
    const result = await TeamServices.createTeam({
        name,
        description,
        designation,
        image
    });
    
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Team member created successfully",
        data: result,
    });
});

const getAllTeams = catchAsync(async (req: Request, res: Response) => {
    const result = await TeamServices.getAllTeams();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Team members retrieved successfully",
        data: result,
    });
});

const getTeamById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TeamServices.getTeamById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Team member retrieved successfully",
        data: result,
    });
});

const updateTeam = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await TeamServices.updateTeam(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Team member updated successfully",
        data: result,
    });
});

const deleteTeam = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TeamServices.deleteTeam(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Team member deleted successfully",
        data: result,
    });
});

export const TeamController = {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam
};