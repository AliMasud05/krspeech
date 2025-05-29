import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SupportTicketServices } from "./support-ticket.service";

const createSupportTicket = catchAsync(async (req: Request, res: Response) => {
    const { title, description, priority, userId } = req.body;
    
    const result = await SupportTicketServices.createSupportTicket({
        title,
        description,
        priority,
        userId
    });
    
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Support ticket created successfully",
        data: result,
    });
});

const getAllSupportTickets = catchAsync(async (req: Request, res: Response) => {
    const result = await SupportTicketServices.getAllSupportTickets();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Support tickets retrieved successfully",
        data: result,
    });
});

const getSupportTicketById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SupportTicketServices.getSupportTicketById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Support ticket retrieved successfully",
        data: result,
    });
});

const updateSupportTicketStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await SupportTicketServices.updateSupportTicketStatus(id, status);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Support ticket status updated successfully",
        data: result,
    });
});

const deleteSupportTicket = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SupportTicketServices.deleteSupportTicket(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Support ticket deleted successfully",
        data: result,
    });
});

export const SupportTicketController = {
    createSupportTicket,
    getAllSupportTickets,
    getSupportTicketById,
    updateSupportTicketStatus,
    deleteSupportTicket
};