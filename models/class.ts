import { ClassType } from "@/lib/types";
import mongoose from "mongoose";

const classSchema = new mongoose.Schema<ClassType>({
  name: String,
  teacherName: String,
  grade: Number,
  clerkId: String,
});

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);	
export default Class;