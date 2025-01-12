import z from "zod";

export const TeacherForm = z.object({
	firstName: z.string().min(3).trim(),
	lastName: z.string().trim().optional(),
	education: z.string().trim().optional(),
	clerkId: z.string(),
});

export const StudentForm = z.object({
	fullName: z.string(),
	firstName: z.string(),
	age: z.coerce.number(),
	grade: z.string(),
	school: z.string(),
	parentName: z.string(),
	phoneNumber: z.string(),
	email: z.string(),
	address: z.string()
  });