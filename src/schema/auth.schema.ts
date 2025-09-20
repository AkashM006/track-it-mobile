import { z } from 'zod';

const baseUserSchema = z.object(
  {
    name: z
      .string('Name is required')
      .min(3, 'Name must be at least 3 characters long')
      .max(64, 'Name cannot be longer then 64 characters'),
    email: z.email('Email is required and must be valid'),
    password: z
      .string('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .max(64, 'Password cannot be longer than 64 characters'),
    confirmPassword: z
      .string('Confirm Password is required')
      .min(1, 'Confirm Password is required'),
  },
  {
    error: 'User details are required',
  },
);

const userRegistrationSchema = baseUserSchema.superRefine((value, ctx) => {
  const { password, confirmPassword } = value;

  console.log({ password, confirmPassword });

  if (password !== confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    });
  }
});

const userLoginSchema = baseUserSchema
  .omit({
    name: true,
    confirmPassword: true,
  })
  .extend({
    password: z.string('Password is required').min(1, 'Password is required'),
  });

const UserSchema = {
  userRegistrationSchema,
  userLoginSchema,
};

export default UserSchema;
