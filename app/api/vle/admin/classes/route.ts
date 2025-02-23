import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongo";
import { ClassForm } from "@/lib/forms";
import Class from "@/models/class";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();
    const classes = await Class.find({});

    return NextResponse.json({ success: true, classes });
  } catch (error: any) {
    console.error("GET classes error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
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
    const zData = ClassForm.parse(data);

    const classId = new mongoose.Types.ObjectId();

    const newClass = new Class({
      name: zData.name,
      description: zData.description,
      grade: zData.grade,
      email: zData.email,
      clerkId: userId,
      classId: classId, 
    });

    await newClass.save();
    return NextResponse.json({ success: true, newClass });
  } catch (error: any) {
    console.error("POST classes error:", error);
    return NextResponse.json({ success: false, error: error.message, status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();
    const { id, ...data } = await request.json();

    const updatedClass = await Class.findByIdAndUpdate(id, data, { new: true });

    if (!updatedClass) {
      return NextResponse.json({ success: false, error: "Class not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, class: updatedClass });
  } catch (error: any) {
    console.error("PUT classes error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}