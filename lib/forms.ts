import z from "zod";

export const TeacherForm = z.object({
	firstName: z.string().min(3).trim(),
	lastName: z.string().trim().optional(),
	education: z.string().trim().optional(),
	clerkId: z.string(),
	subjects: z.string().optional(),
	phoneNumber: z.string().optional(),
	description: z.string().optional(),
	email: z.string().email().optional(),
});

export const StudentForm = z.object({
	indexNumber: z.string().default(""),
	firstName: z.string(),
	lastName: z.string(),
	birthDate: z.coerce.date(),
	grade: z.coerce.number(),
	school: z.string(),
	parentName: z.string(),
	phoneNumber: z.string(),
	email: z.string(),
	address: z.string(),
	status: z.string().default("pending"),
	clerkId: z.string(),

	});

  export const ClassForm = z.object({
	name: z.string(),
	description: z.string(),
	grade: z.string(),
	email: z.string(),
	
	});
