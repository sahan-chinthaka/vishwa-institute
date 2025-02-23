import AttendanceTab from "@/components/tabs/AttendanceTab";
import MessagesTab from "@/components/tabs/MessagesTab";
import PaymentsTab from "@/components/tabs/PaymentsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import connectMongo from "@/lib/mongo";
import Class from "@/models/class";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const ClassPage = async ({ params }: { params: Promise<{ class_id: string }> }) => {
	await connectMongo();
	const user = await currentUser();

	if (!user) {
		return redirect("/sign-in");
	}

	const classData = await Class.findById((await params).class_id);

	if (!classData) {
		return <div>Class not found</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-8">
				<div className="rounded-lg bg-white p-6 shadow">
					<h1 className="mb-4 text-3xl font-bold">{classData.name}</h1>

					<Tabs defaultValue="messages" className="mt-6">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="messages">Messages</TabsTrigger>
							<TabsTrigger value="attendance">Attendance</TabsTrigger>
							<TabsTrigger value="payments">Payments</TabsTrigger>
						</TabsList>
						<TabsContent value="messages" className="mt-6">
							<MessagesTab />
						</TabsContent>
						<TabsContent value="attendance" className="mt-6">
							<AttendanceTab />
						</TabsContent>
						<TabsContent value="payments" className="mt-6">
							<PaymentsTab classId={(await params).class_id} studentId={user.id} />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default ClassPage;
