import { Router } from 'express';
import { z } from 'zod';
import { coursesService } from './courses.service';

const createCourseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  ownerId: z.string().uuid(),
});

export const coursesRouter = Router();

coursesRouter.get('/', async (_req, res, next) => {
  try {
    const courses = await coursesService.list();
    res.json({ data: courses });
  } catch (error) {
    next(error);
  }
});

coursesRouter.post('/', async (req, res, next) => {
  try {
    const data = createCourseSchema.parse(req.body);
    const course = await coursesService.create(data);
    res.status(201).json({ data: course });
  } catch (error) {
    next(error);
  }
});

coursesRouter.get('/:id', async (req, res, next) => {
  try {
    const course = await coursesService.get(req.params.id);
    res.json({ data: course });
  } catch (error) {
    next(error);
  }
});
