import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ContactSubmissionServices } from "./contact.service";

const createContactSubmission = catchAsync(async (req: Request, res: Response) => {
    const { name, email, subject, message, files } = req.body;
    
    const result = await ContactSubmissionServices.createContactSubmission({
        name,
        email,
        subject,
        message,
        files
    });
    
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Contact submission created successfully",
        data: result,
    });
});

const getAllContactSubmissions = catchAsync(async (req: Request, res: Response) => {
    const result = await ContactSubmissionServices.getAllContactSubmissions();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Contact submissions retrieved successfully",
        data: result,
    });
});

const getContactSubmissionById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ContactSubmissionServices.getContactSubmissionById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Contact submission retrieved successfully",
        data: result,
    });
});

const updateContactSubmissionStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await ContactSubmissionServices.updateContactSubmissionStatus(id, status);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Contact submission status updated successfully",
        data: result,
    });
});

const respondToContactSubmission = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { response, assignedTo } = req.body;
    const result = await ContactSubmissionServices.respondToContactSubmission(id, {
        response,
        assignedTo
    });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Response added to contact submission",
        data: result,
    });
});

const deleteContactSubmission = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ContactSubmissionServices.deleteContactSubmission(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Contact submission deleted successfully",
        data: result,
    });
});

export const ContactSubmissionController = {
    createContactSubmission,
    getAllContactSubmissions,
    getContactSubmissionById,
    updateContactSubmissionStatus,
    respondToContactSubmission,
    deleteContactSubmission
};