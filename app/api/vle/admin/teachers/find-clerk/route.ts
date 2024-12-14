import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		const email = req.nextUrl.searchParams.get("email");

		if (!email) throw new Error("Email is not here");

		const client = await clerkClient();

		const res = await client.users.getUserList({
			emailAddress: [email],
		});

		return NextResponse.json({ done: true, users: res.data });
	} catch (e: any) {
		return NextResponse.json({ done: false, error: e.message });
	}
}
