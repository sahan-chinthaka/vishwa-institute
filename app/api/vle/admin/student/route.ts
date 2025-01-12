import { StudentForm } from "@/lib/forms";
import connectMongo from "@/lib/mongo";
import { StudentType } from "@/lib/types";
import Student from "@/models/student";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    
    const data = await req.json();
    const zData = StudentForm.parse(data);

    const student = new Student<StudentType>({
      fullName: zData.fullName,
      firstName: zData.firstName,
      age: zData.age,
      grade: zData.grade,
      school: zData.school,
      parentName: zData.parentName,
      phoneNumber: zData.phoneNumber,
      email: zData.email,
      address: zData.address
    });

    await student.save();
    return NextResponse.json({ success: true, student });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}