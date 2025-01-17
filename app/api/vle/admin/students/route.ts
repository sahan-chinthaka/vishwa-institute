import { auth } from "@clerk/nextjs/server";
import connectMongo from "@/lib/mongo";
import Student from "@/models/student";
import { StudentForm } from "@/lib/forms";
import {NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const { userId } =await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectMongo();
    
    const students = await Student.find({})
      .sort({ createdAt: -1 })
      .select({
        indexNumber: 1,
        firstName: 1,
        lastName: 1,
        birthDate: 1,
        grade: 1,
        school: 1,
        clerkId: 1,
        status: 1
      });

    return NextResponse.json({
      success: true,
      students
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectMongo();
    const data = await req.json();
    const zData = StudentForm.parse(data);

    const student = new Student({
      indexNumber: zData.indexNumber,
      firstName: zData.firstName,
      lastName: zData.lastName,
      birthDate: zData.birthDate,
      grade: zData.grade,
      school: zData.school,
      parentName: zData.parentName,
      phoneNumber: zData.phoneNumber,
      email: zData.email,
      address: zData.address,
      status: "pending",
      clerkId: userId,
    });

    await student.save();
    return NextResponse.json({ success: true, student });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}