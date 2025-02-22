import { generateIndexNumber } from "@/lib/generateIndexNumber";
import connectMongo from "@/lib/mongo";
import Student from "@/models/student";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { id } = await params;

		await connectMongo();
		const student = await Student.findById(id);

		if (!student) {
			return NextResponse.json(
				{ success: false, error: "Student not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ success: true, student });
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 },
		);
	}
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { id } = await params;
		await connectMongo();
		const data = await request.json();

		if (data.action === "approve") {
			const student = await Student.findById(id);
			if (!student) {
				return NextResponse.json(
					{ success: false, error: "Student not found" },
					{ status: 404 },
				);
			}

			const client = await clerkClient();
			client.users.updateUserMetadata(student.clerkId, {
				publicMetadata: { student: "true" },
			});

			if (student.status === "pending") {
				const birthYear = new Date(student.birthDate).getFullYear();
				data.indexNumber = await generateIndexNumber(birthYear);
			}

			const updatedStudent = await Student.findByIdAndUpdate(
				id,
				{ $set: { status: "approved", indexNumber: data.indexNumber } },
				{ new: true },
			);

			return NextResponse.json({ success: true, student: updatedStudent });
		} else {
			const updatedStudent = await Student.findByIdAndUpdate(
				id,
				{ $set: data },
				{ new: true },
			);

			if (!updatedStudent) {
				return NextResponse.json(
					{ success: false, error: "Student not found" },
					{ status: 404 },
				);
			}

			return NextResponse.json({ success: true, student: updatedStudent });
		}
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json(
				{ success: false, error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { id } = await params;

		await connectMongo();
		const deletedStudent = await Student.findByIdAndDelete(id);

		if (!deletedStudent) {
			return NextResponse.json(
				{ success: false, error: "Student not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ success: true, student: deletedStudent });
	} catch (error: any) {
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 },
		);
	}
}
