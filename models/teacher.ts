import { TeacherType } from "@/lib/types";
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema<TeacherType>({
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
