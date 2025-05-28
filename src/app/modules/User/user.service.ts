import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import { hashPassword } from "../../../helpars/passwordHelpers";
import prisma from "../../../shared/prisma";

const registerUser = async ({firstName,lastName,email,password}:{firstName:string,lastName:string,email:string,password:string})=>{
 
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
    first_name: firstName,
    last_name: lastName,
      email,
      password: hashedPassword,
    },
  });

  return user;
}

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const UserServices = {
    registerUser,
    getAllUsers
    };