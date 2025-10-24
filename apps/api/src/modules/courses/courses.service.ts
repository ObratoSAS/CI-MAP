import createError from 'http-errors';
import { prisma } from '../../prisma/client';

export const coursesService = {
  async list() {
    return prisma.course.findMany({
      include: {
        owner: true,
        sections: { include: { activities: true }, orderBy: { order: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  },

  async create(data: { title: string; description?: string; ownerId: string }) {
    return prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        ownerId: data.ownerId,
      },
    });
  },

  async get(id: string) {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        owner: true,
        sections: { include: { activities: true }, orderBy: { order: 'asc' } },
      },
    });

    if (!course) {
      throw createError(404, 'Course not found');
    }

    return course;
  },
};
