import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongo";
import Class from "@/models/class";
import EnrolledStudent from "@/models/enrolled-students"; // Import the EnrolledStudent model
import { NextRequest } from "next/server";


export async function PUT(req: NextRequest, { params }: { params: { classId: string } }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectMongo();
        const { studentIds } = await req.json();

        const classToUpdate = await Class.findById(params.classId);

        if (!classToUpdate) {
            return NextResponse.json({ success: false, error: "Class not found" }, { status: 404 });
        }

        await EnrolledStudent.deleteMany({ classRef: params.classId });

        const newEnrollments = studentIds.map((studentId: string) => ({
            classRef: params.classId,
            studentRef: studentId,
        }));

        await EnrolledStudent.insertMany(newEnrollments);

        return NextResponse.json({ success: true, message: "Students assigned successfully" });
    } catch (error: any) {
        console.error("PUT classes error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}