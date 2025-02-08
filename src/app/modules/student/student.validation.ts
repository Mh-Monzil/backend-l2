import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required. Please provide the first name.'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, 'Last name is required. Please provide the last name.'),
});

const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1, 'Father name is required. Please provide the father name.'),
  fatherOccupation: z.string().min(1, 'Father occupation is required.'),
  fatherContactNo: z.string().min(1, 'Father contact number is required.'),
  motherName: z
    .string()
    .min(1, 'Mother name is required. Please provide the mother name.'),
  motherOccupation: z.string().min(1, 'Mother occupation is required.'),
  motherContactNo: z.string().min(1, 'Mother contact number is required.'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required.'),
  occupation: z.string().min(1, 'Local guardian occupation is required.'),
  contactNo: z.string().min(1, 'Local guardian contact number is required.'),
  address: z.string().min(1, 'Local guardian address is required.'),
});

// Define Zod ValidationSchema for the Student model

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z
        .enum(['male', 'female', 'other'], {
          invalid_type_error:
            "Invalid gender value. Allowed values are: 'male', 'female', 'other'.",
        })
        .refine(
          (val) => ['male', 'female', 'other'].includes(val),
          'Gender is required. Please specify the gender.',
        ),
      email: z.string().email('A valid email is required.'),
      dateOfBirth: z.string().optional(),
      contactNo: z.string().min(1, 'Contact number is required.'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required.'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional()
        .refine(
          (val) =>
            !val ||
            ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(val),
          "Invalid blood group value. Allowed values are: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'.",
        ),
      presentAddress: z.string().min(1, 'Present address is required.'),
      permanentAddress: z.string().min(1, 'Permanent address is required.'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImage: z
        .string()
        .url('Profile image must be a valid URL.')
        .optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
