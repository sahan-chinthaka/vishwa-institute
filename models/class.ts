import mongoose, { Schema, model, models } from "mongoose";

const ClassSchema = new Schema({
	classId: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
});

// Use `models.Class` if it already exists, otherwise create a new model
const Class = models.Class || model("Class", ClassSchema);

export default Class;
