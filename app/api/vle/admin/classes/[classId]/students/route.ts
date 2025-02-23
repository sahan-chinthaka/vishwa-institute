import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongo";
import Class from "@/models/class";
import EnrolledStudent from "@/models/enrolled-students";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export async function PUT(request: NextRequest, { params }: { params: { classId: string } }) {
  try {
    const { classId } = await params;

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();
    const { studentIds } = await request.json();

    const classToUpdate = await Class.findById(classId);

    if (!classToUpdate) {
      return NextResponse.json({ success: false, error: "Class not found" }, { status: 404 });
    }

    await EnrolledStudent.deleteMany({ classRef: classId });

    const newEnrollments = studentIds.map((studentId: string) => ({
      classRef: new mongoose.Types.ObjectId(classId),
      studentRef: new mongoose.Types.ObjectId(studentId),
    }));

    await EnrolledStudent.insertMany(newEnrollments);

    return NextResponse.json({ success: true, message: "Students assigned successfully" });
  } catch (error: any) {
    console.error("PUT classes error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}