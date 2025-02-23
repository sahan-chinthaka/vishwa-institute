import mongoose, { Schema, model, models } from "mongoose";

interface ClassType {
  name: string;
  description: string;
  grade: string;
  teacherRef: mongoose.Schema.Types.ObjectId;
  classId: mongoose.Schema.Types.ObjectId;
  clerkId: string;
  email: string;
  students: mongoose.Schema.Types.ObjectId[];
}

const classSchema = new Schema<ClassType>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  grade: { type: String, required: true },
  teacherRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: false,
  },
  // email: { type: String, required: true },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId(),
  },

});

const Class = models.Class || model<ClassType>("Class", classSchema);
export default Class;