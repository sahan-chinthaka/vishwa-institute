import { auth } from "@clerk/nextjs/server";
import connectMongo from "@/lib/mongo";
import Student from "@/models/student";
import {NextResponse } from "next/server";

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