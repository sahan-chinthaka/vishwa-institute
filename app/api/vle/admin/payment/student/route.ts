import connectMongo from "@/lib/mongo";
import Student from "@/models/student";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		await connectMongo();
		const index_no = req.nextUrl.searchParams.get("index_no");

		if (!index_no) {
			return NextResponse.json({ success: false, message: "Invalid index_no" });
		}

		const student = await Student.findOne({
			indexNumber: index_no,
		});

		if (!student) {
			return NextResponse.json({
				success: false,
				message: "Student not found",
			});
		}

		return NextResponse.json({ success: true, student });
	} catch (e: any) {
		return NextResponse.json({ success: false, message: e.message });
	}
}
