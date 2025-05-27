import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import { hashPassword } from "../../../helpars/passwordHelpers";
import prisma from "../../../shared/prisma";

const registerUser = async ({name,email,password}:{name:string,email:string,password:string})=>{
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
}

export const UserServices = {
    registerUser,
    };