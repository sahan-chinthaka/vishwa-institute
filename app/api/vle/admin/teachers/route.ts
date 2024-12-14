import { TeacherForm } from "@/lib/forms";
import connectMongo from "@/lib/mongo";
import { TeacherType } from "@/lib/types";
import Teacher from "@/models/teacher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		await connectMongo();

		const data = await req.json();
		const zData = TeacherForm.parse(data);

		const teacher = new Teacher<TeacherType>({
			firstName: zData.firstName,
			lastName: zData.lastName,
			education: zData.education,
			clerkId: zData.clerkId,
		});

		await teacher.save();

		return NextResponse.json({ done: true, teacher });
	} catch (error: any) {
		return NextResponse.json({ done: false, error: error.message });
	}
}
