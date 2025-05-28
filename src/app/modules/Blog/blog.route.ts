import express from 'express';
import { BlogPostController } from './blog.controller';
const router = express.Router();

router.post('/', BlogPostController.createBlogPost);
router.get('/', BlogPostController.getAllBlogPosts);
router.get('/:id', BlogPostController.getBlogPostById);
router.patch('/:id', BlogPostController.updateBlogPost);
router.delete('/:id', BlogPostController.deleteBlogPost);

export const BlogRoutes = router;