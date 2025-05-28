import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BlogPostServices } from "./blog.service";

const createBlogPost = catchAsync(async (req: Request, res: Response) => {
    const { title, image, content, authorId } = req.body;
    
    const result = await BlogPostServices.createBlogPost({
        title,
        image,
        content,
        authorId
    });
    
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Blog post created successfully",
        data: result,
    });
});

const getAllBlogPosts = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogPostServices.getAllBlogPosts();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog posts retrieved successfully",
        data: result,
    });
});

const getBlogPostById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BlogPostServices.getBlogPostById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog post retrieved successfully",
        data: result,
    });
});

const updateBlogPost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await BlogPostServices.updateBlogPost(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog post updated successfully",
        data: result,
    });
});

const deleteBlogPost = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BlogPostServices.deleteBlogPost(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Blog post deleted successfully",
        data: result,
    });
});

export const BlogPostController = {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost
};