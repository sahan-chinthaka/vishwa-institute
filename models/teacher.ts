import { TeacherForm } from "@/lib/forms";
import mongoose from "mongoose";
import { z } from "zod";

const teacherSchema = new mongoose.Schema<z.infer<typeof TeacherForm>>({
	firstName: String,
	lastName: {
		type: String,
		required: false,
	},
	education: {
		type: String,
		required: false,
	},
	clerkId: String,
});

const Teacher =
	mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;
