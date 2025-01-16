import { auth } from "@clerk/nextjs/server";
import { StudentForm } from "@/lib/forms";
import connectMongo from "@/lib/mongo";
import { StudentType } from "@/lib/types";
import Student from "@/models/student";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const { userId } = await auth();
    console.log(userId);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    } 

    await connectMongo();
    const data = await req.json();
    const zData = StudentForm.parse(data);

    const student = new Student<StudentType>({

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
      status: zData.status,
      clerkId: userId,
    });
    
    await student.save();
    return NextResponse.json({ success: true, student });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}


