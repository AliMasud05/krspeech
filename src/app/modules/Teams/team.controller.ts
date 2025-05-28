import { Request, Response } from 'express';
import { teamService } from './team.service';
import { validationResult } from 'express-validator';
import sendResponse from '../../../shared/sendResponse';



export const teamController = {
  async create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const team = await teamService.create(req.body);
       sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Team created successfully",
        data: team,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const teams = await teamService.findAll();
     sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Teams retrieved successfully",
        data: teams,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const team = await teamService.findById(req.params.id);
      if (!team) return res.status(404).json({ message: 'Team not found' });
     sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Team retrieved successfully",
        data: team,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updated = await teamService.update(req.params.id, req.body);
      sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Team updated successfully",
        data: updated,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  },

  async delete(req: Request, res: Response) {
    try {
    const result= await teamService.delete(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Team deleted successfully",
      data: result,
    });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};