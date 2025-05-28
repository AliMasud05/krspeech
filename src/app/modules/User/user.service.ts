import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import { hashPassword } from "../../../helpars/passwordHelpers";
import prisma from "../../../shared/prisma";

const registerUser = async (payload: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    addressLine1?: string;
    addressLine2?: string;
    country?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    referralSource?: string;
}) => {
    const { email, password, ...userData } = payload;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = await prisma.user.create({
        data: {
            ...userData,
            email,
            password: hashedPassword,
        },
    });

    return user;
};
const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const UserServices = {
    registerUser,
    getAllUsers
    };