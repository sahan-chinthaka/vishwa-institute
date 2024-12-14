import z from "zod";

export const TeacherForm = z.object({
	firstName: z.string().min(3).trim(),
	lastName: z.string().trim().optional(),
	education: z.string().trim().optional(),
	clerkId: z.string(),
});
