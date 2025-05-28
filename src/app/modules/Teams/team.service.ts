import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import prisma from "../../../shared/prisma";

const createTeam = async (payload: {
    name: string;
    description?: string;
    designation?: string;
    image?: string;
}) => {
    const result = await prisma.team.create({
        data: payload
    });
    return result;
};

const getAllTeams = async () => {
    const result = await prisma.team.findMany();
    return result;
};

const getTeamById = async (id: string) => {
    const result = await prisma.team.findUnique({
        where: { id }
    });
    
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Team member not found");
    }
    
    return result;
};

const updateTeam = async (id: string, payload: {
    name?: string;
    description?: string;
    designation?: string;
    image?: string;
}) => {
    const result = await prisma.team.update({
        where: { id },
        data: payload
    });
    return result;
};

const deleteTeam = async (id: string) => {
    // First verify the team member exists
    const teamMember = await prisma.team.findUnique({
        where: { id }
    });
    
    if (!teamMember) {
        throw new ApiError(httpStatus.NOT_FOUND, "Team member not found");
    }

    // Perform the hard delete
    const result = await prisma.team.delete({
        where: { id }
    });
    
    return result;
};

export const TeamServices = {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam
};