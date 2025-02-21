import connectMongo from "@/lib/mongo";
import Class from "@/models/class";
import { NextResponse } from "next/server";

export async function GET() {
	await connectMongo();

	const classes = await Class.find();

	return NextResponse.json({ classes });
}
