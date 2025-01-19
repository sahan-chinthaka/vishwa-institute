import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Footer from "@/components/footer";

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

	if (role == "admin") return redirect("/vle/admin");
	else if (role == "student") return redirect("/vle/student");
	else if (role == "teacher") return redirect("/vle/teacher");
	//take a conditional approach to render the page. Check with mongoose if the user is a student or not

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
			<Footer/>
		</div>
	);
}

export default VLEPage;
