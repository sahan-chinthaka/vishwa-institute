import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
	message: String,
	date: Date,
	classRef: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Class",
	},
});

const Message =
	mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
