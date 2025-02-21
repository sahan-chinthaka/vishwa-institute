import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Footer from "@/components/footer";
import connectMongo from "@/lib/mongo";
import Student from "@/models/student";

type UserRole = undefined | "student" | "admin" | "teacher";

async function VLEPage() {
	const user = await currentUser();
	const headersList = await headers();

	const host = headersList.get("host");
	const protocol = headersList.get("x-forwarded-proto") || "http";
	const currentURL = `${protocol}://${host}`;

	if (!user) {
		return redirect(
			"/sign-in?redirect_url=" + encodeURIComponent(currentURL + "/vle"),
		);
	}

	const role: UserRole = user.publicMetadata["role"] as UserRole;
	console.log("role " + role);

	if (role == "admin") return redirect("/vle/admin");
	else if (role == "teacher") return redirect("/vle/teacher");
	else {
		console.log(role);
		await connectMongo();
		const student = await Student.findOne({ clerkId: user.id });
		console.log(student);

		if (!student) {
			return (
				<div className="flex justify-center">
					<div className="mx-2 my-10 w-full max-w-[600px] rounded border p-10 shadow-lg">
						<p className="text-lg font-bold">
							You are not a registered student in&nbsp;
							<span className="text-primary">Vishwa Institute</span>
						</p>
						<br />
						<Link href="/student-register">
							<Button>Register Here</Button>
						</Link>
					</div>
					<Footer />
				</div>
			);
		} else if (student.status === "pending") {
			return (
				<div className="flex justify-center">
					<div className="mx-2 my-10 w-full max-w-[600px] rounded border p-10 shadow-lg">
						<p className="text-lg font-bold">Your application is pending.</p>
					</div>
					<Footer />
				</div>
			);
		} else if (student.status === "approved") {
			return redirect("/vle/student");
		}
	}

	return (
		<div className="flex justify-center">
			<div className="mx-2 my-10 w-full max-w-[600px] rounded border p-10 shadow-lg">
				<p className="text-lg font-bold">
					You are not a registered student in&nbsp;
					<span className="text-primary">Vishwa Institute</span>
				</p>
				<br />
				<Link href="/student-register">
					<Button>Register Here</Button>
				</Link>
			</div>
			<Footer />
		</div>
	);
}

export default VLEPage;
