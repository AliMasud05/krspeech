import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import prisma from "../../../shared/prisma";

const createContactSubmission = async (payload: {
    name: string;
    email: string;
    subject?: string;
    message: string;
    files?: Array<{
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        url: string;
    }>;
}) => {
    const result = await prisma.contactSubmission.create({
        data: {
            name: payload.name,
            email: payload.email,
            subject: payload.subject,
            message: payload.message,
            files: {
                create: payload.files || []
            }
        },
        include: {
            files: true
        }
    });
    return result;
};

const getAllContactSubmissions = async () => {
    const result = await prisma.contactSubmission.findMany({
        include: {
            files: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
};

const getContactSubmissionById = async (id: string) => {
    const result = await prisma.contactSubmission.findUnique({
        where: { id },
        include: {
            files: true
        }
    });
    
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Contact submission not found");
    }
    
    return result;
};

const updateContactSubmissionStatus = async (id: string, status: string) => {
    // Validate status
    if (!['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].includes(status)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid status value");
    }

    const result = await prisma.contactSubmission.update({
        where: { id },
        data: {
            status: status as 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED',
            updatedAt: new Date()
        },
        include: {
            files: true
        }
    });
    return result;
};

const respondToContactSubmission = async (id: string, payload: {
    response: string;
    assignedTo?: string;
}) => {
    const result = await prisma.contactSubmission.update({
        where: { id },
        data: {
            response: payload.response,
            assignedTo: payload.assignedTo,
            respondedAt: new Date(),
            status: 'RESOLVED',
            updatedAt: new Date()
        },
        include: {
            files: true
        }
    });
    return result;
};

const deleteContactSubmission = async (id: string) => {
    // First verify the submission exists
    const submission = await prisma.contactSubmission.findUnique({
        where: { id },
        include: { files: true }
    });
    
    if (!submission) {
        throw new ApiError(httpStatus.NOT_FOUND, "Contact submission not found");
    }

    // Perform the delete (files will be cascade deleted)
    const result = await prisma.contactSubmission.delete({
        where: { id }
    });
    
    return result;
};

export const ContactSubmissionServices = {
    createContactSubmission,
    getAllContactSubmissions,
    getContactSubmissionById,
    updateContactSubmissionStatus,
    respondToContactSubmission,
    deleteContactSubmission
};