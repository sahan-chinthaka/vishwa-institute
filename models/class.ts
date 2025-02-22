import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
	classId: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
});

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);
export default Class;
