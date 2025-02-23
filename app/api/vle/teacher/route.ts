import Class from "@/models/class";
import Message from "@/models/message";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const class_id = req.nextUrl.searchParams.get("class_id");
	const data = await req.json();

	const classRef = await Class.findById(class_id);

	const newMessage = new Message({
		message: data.message,
		classRef,
		date: data.date,
	});

	await newMessage.save();

	return NextResponse.json({
		message: "Message sent successfully",
	});
}

export async function GET(req: NextRequest) {
	const class_id = req.nextUrl.searchParams.get("class_id");

	const classRef = await Class.findById(class_id);

	const messages = await Message.find({
		classRef,
	});

	return NextResponse.json({
		messages,
	});
}
