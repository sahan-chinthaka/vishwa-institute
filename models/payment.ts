import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
	classRef: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Class",
	},
	studentRef: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
	},
	amount: {
		type: Number,
		required: true,
	},
	month: {
		type: String,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
});

const Payment =
	mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
