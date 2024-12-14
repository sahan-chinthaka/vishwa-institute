import { TeacherForm } from "@/lib/forms";
import connectMongo from "@/lib/mongo";
import Teacher from "@/models/teacher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{
		params,
	}: {
		params: Promise<{ id: string }>;
	},
) {
	try {
		const { id } = await params;
		await connectMongo();

		const teacher = await Teacher.findOne({
			clerkId: id,
		});

		if (!teacher) throw new Error(`There is no teacher with '${id}' id`);

		return NextResponse.json({ done: true, teacher });
	} catch (error: any) {
		return NextResponse.json({ done: false, error: error.message });
	}
}

export async function DELETE(
	req: NextRequest,
	{
		params,
	}: {
		params: Promise<{ id: string }>;
	},
) {
	try {
		const { id } = await params;
		await connectMongo();

		await Teacher.findOneAndDelete({
			clerkId: id,
		});

		return NextResponse.json({ done: true });
	} catch (error: any) {
		return NextResponse.json({ done: false, error: error.message });
	}
}

export async function PUT(
	req: NextRequest,
	{
		params,
	}: {
		params: Promise<{ id: string }>;
	},
) {
	try {
		const { id } = await params;
		const data = TeacherForm.partial({ clerkId: true }).parse(await req.json());
		await connectMongo();

		await Teacher.findOneAndUpdate(
			{
				clerkId: id,
			},
			{
				firstName: data.firstName,
				lastName: data.lastName,
				education: data.education,
			},
		);

		return NextResponse.json({ done: true });
	} catch (error: any) {
		return NextResponse.json({ done: false, error: error.message });
	}
}
