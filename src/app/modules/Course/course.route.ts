import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseControllers } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  courseControllers.createCourse,
);

router.get('/', courseControllers.getAllCourses);
router.get('/:id', courseControllers.getSingleCourse);

router.delete('/:id', courseControllers.deleteCourse);

export const CourseRoutes = router;
