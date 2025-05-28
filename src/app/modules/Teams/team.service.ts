import { PrismaClient, Team } from '@prisma/client';

const prisma = new PrismaClient();

export type CreateTeamData = {
  name: string;
  description?: string;
  degination?: string;
  image?: string;
};

export class TeamService {
  async create(data: CreateTeamData): Promise<Team> {
    return prisma.team.create({ data });
  }

  async findAll(): Promise<Team[]> {
    return prisma.team.findMany();
  }

  async findById(id: string): Promise<Team | null> {
    return prisma.team.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<CreateTeamData>): Promise<Team> {
    return prisma.team.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Team> {
    return prisma.team.delete({ where: { id } });
  }
}

export const teamService = new TeamService();