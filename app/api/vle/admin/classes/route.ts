import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongo";
import { ClassForm } from "@/lib/forms";
import Class from "@/models/class";
import Teacher from "@/models/teacher";
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
        const teacher = await Teacher.findOne({ email: zData.email });

        if (!teacher) {
            return NextResponse.json(
                { success: false, error: "Teacher not found with this email" },
                { status: 400 }
            );
        }

        const classId = new mongoose.Types.ObjectId();

        const newClass = new Class({
            name: zData.name,
            description: zData.description,
            grade: zData.grade,
            // email: zData.email,
            classId: classId,
            teacherRef: teacher._id, 
        });

        await newClass.save();
        return NextResponse.json({ success: true, newClass });
    } catch (error: any) {
        console.error("POST classes error:", error);
        return NextResponse.json({ success: false, error: error.message, status: 500 });
    }
}