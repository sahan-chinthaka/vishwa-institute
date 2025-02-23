import Footer from "@/components/footer";
import connectMongo from "@/lib/mongo";
import Class from "@/models/class";
import Teacher from "@/models/teacher";
import { currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const VLETeacherPage = async () => {
	await connectMongo();

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

	const user_id = user.id;
	const userRef = await Teacher.findOne({
		clerkId: user_id,
	});

	const classes = await Class.find({
		teacherRef: userRef,
	});

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-6 text-2xl font-bold">My Classes</h1>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{classes.map((_class: any) => (
						<Link key={_class._id} href={`/vle/teacher/${_class._id}`}>
							<div className="cursor-pointer rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md">
								<h2 className="text-xl font-semibold">{_class.name}</h2>
								<p className="text-gray-600">{_class.description}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default VLETeacherPage;
