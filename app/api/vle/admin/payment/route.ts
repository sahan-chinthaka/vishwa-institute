import connectMongo from "@/lib/mongo";
import Class from "@/models/class";
import Payment from "@/models/payment";
import Student from "@/models/student";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		await connectMongo();
		const body: any = await req.json();

		const classRef = await Class.findById(body.class_name);

		if (!classRef) throw new Error("Class not found");

		const studentRef = await Student.findOne({
			indexNumber: body.index_no,
		});

		if (!studentRef) throw new Error("Student not found");

		const payment = await Payment.create({
			classRef,
			studentRef,
			amount: parseFloat(body.amount),
			month: body.month,
			year: body.year,
		});

		return NextResponse.json({ success: true, payment });
	} catch (e: any) {
		return NextResponse.json({ success: false, message: e.message });
	}
}

export async function GET(req: NextRequest) {
	await connectMongo();
	const class_id = req.nextUrl.searchParams.get("class_id");

	const classRef = await Class.findById(class_id);

	const payments = await Payment.find({
		classRef,
	}).populate("studentRef");

	return NextResponse.json({ payments });
}
