import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: String},
  school: { type: String, required: true },
  parentName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true }
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
export default Student;




