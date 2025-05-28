import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import prisma from "../../../shared/prisma";

const createBlogPost = async (payload: {
    title: string;
    image?: string;
    content: string;
    authorId: string;
}) => {
    const result = await prisma.blogPost.create({
        data: payload,
        include: {
            author: true
        }
    });
    return result;
};

const getAllBlogPosts = async () => {
    return await prisma.blogPost.findMany({
        include: { author: true }
    });
};

const getBlogPostById = async (id: string) => {
    const result = await prisma.blogPost.findUnique({
        where: { id },
        include: {
            author: true
        }
    });
    
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Blog post not found");
    }
    
    return result;
};

const updateBlogPost = async (id: string, payload: {
    title?: string;
    image?: string;
    content?: string;
}) => {
    const result = await prisma.blogPost.update({
        where: { id },
        data: payload,
        include: {
            author: true
        }
    });
    return result;
};

const deleteBlogPost = async (id: string) => {
    // Verify existence first
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
        throw new ApiError(httpStatus.NOT_FOUND, "Blog post not found");
    }

    // Perform delete
    await prisma.blogPost.delete({ where: { id } });
    
    return { id, message: "Blog post deleted permanently" };
};

export const BlogPostServices = {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost
};