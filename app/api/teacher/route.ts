import Teacher from "@/models/teacher";
import { NextResponse } from "next/server";

export async function GET() {
	const teachers = await Teacher.find({});

	return NextResponse.json({ teachers });
}
