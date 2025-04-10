import { z } from 'zod';

const PreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'Title must be string',
      required_error: 'Title is required',
    }),
    code: z.string({
      invalid_type_error: 'Code must be string',
      required_error: 'Code is required',
    }),
    credits: z.number({
      invalid_type_error: 'Credits must be number',
      required_error: 'Credits is required',
    }),
    preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
};
