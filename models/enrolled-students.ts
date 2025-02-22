import mongoose from "mongoose";
import "./class"; // Import class model first to ensure it's registered

const enrolledStudentsSchema = new mongoose.Schema({
	classRef: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Class",
		required: true,
	},
	studentRef: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		required: true,
	},
	enrolledDate: { type: Date, default: Date.now },
});

const EnrolledStudent =
	mongoose.models.EnrolledStudent ||
	mongoose.model("EnrolledStudent", enrolledStudentsSchema);
export default EnrolledStudent;
