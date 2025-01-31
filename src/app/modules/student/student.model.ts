import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  Username,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<Username>({
  firstName: {
    type: String,
    required: [true, 'First name is required. Please provide the first name.'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required. Please provide the last name.'],
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [
      true,
      'Father name is required. Please provide the father name.',
    ],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required.'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required.'],
  },
  motherName: {
    type: String,
    required: [
      true,
      'Mother name is required. Please provide the mother name.',
    ],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required.'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required.'],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required.'],
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required.'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required.'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required.'],
  },
});

const studentSchema = new Schema<Student>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required.'],
      unique: true,
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required.'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "Invalid gender value. Allowed values are: 'male', 'female', 'other'.",
      },
      required: [true, 'Gender is required. Please specify the gender.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    dateOfBirth: {
      type: String,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required.'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required.'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message:
          "Invalid blood group value. Allowed values are: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'.",
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required.'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required.'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required.'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required.'],
    },
    profileImage: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//pre save middleware/hook : will work on create() and save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  //hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

//post save middleware/hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

// Query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: {
      isDeleted: { $ne: true },
    },
  });

  next();
});

studentSchema.virtual('fullName').get(function (next) {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;

  next();
});

export const StudentModel = model<Student>('Student', studentSchema);
