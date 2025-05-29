import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import prisma from "../../../shared/prisma";

const createSupportTicket = async (payload: {
    title: string;
    description: string;
    priority?: string;
    userId: string;
}) => {
    const result = await prisma.supportTicket.create({
        data: {
            title: payload.title,
            description: payload.description,
            priority: payload.priority || "medium",
            userId: payload.userId
        },
        include: {
            user: true
        }
    });
    return result;
};

const getAllSupportTickets = async () => {
    const result = await prisma.supportTicket.findMany({
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return result;
};

const getSupportTicketById = async (id: string) => {
    const result = await prisma.supportTicket.findUnique({
        where: { id },
        include: {
            user: true
        }
    });
    
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Support ticket not found");
    }
    
    return result;
};

const updateSupportTicketStatus = async (id: string, status: string) => {
    // Validate status
    if (!['OPEN', 'IN_PROGRESS', 'CLOSED'].includes(status)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid status value");
    }

    const result = await prisma.supportTicket.update({
        where: { id },
        data: {
            status: status as 'OPEN' | 'IN_PROGRESS' | 'CLOSED'
        },
        include: {
            user: true
        }
    });
    return result;
};

const deleteSupportTicket = async (id: string) => {
    // First verify the ticket exists
    const ticket = await prisma.supportTicket.findUnique({
        where: { id }
    });
    
    if (!ticket) {
        throw new ApiError(httpStatus.NOT_FOUND, "Support ticket not found");
    }

    // Perform the delete
    const result = await prisma.supportTicket.delete({
        where: { id }
    });
    
    return result;
};

export const SupportTicketServices = {
    createSupportTicket,
    getAllSupportTickets,
    getSupportTicketById,
    updateSupportTicketStatus,
    deleteSupportTicket
};