import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  indexNumber: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  grade: { type: String},
  school: { type: String, required: true },
  parentName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, default: "pending" },
  clerkId: { type: String, required: true },
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
export default Student;




