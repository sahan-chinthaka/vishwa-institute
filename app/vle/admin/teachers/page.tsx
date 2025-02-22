import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import connectMongo from "@/lib/mongo";
import { TeacherType } from "@/lib/types";
import Teacher from "@/models/teacher";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function AdminTeacherManagement() {
	await connectMongo();

	const teachers = await Teacher.find<TeacherType>();

	return (
		<div className="space-y-5 p-5">
			<div>
				<Link href="./teachers/new-teacher">
					<Button>New Teacher</Button>
				</Link>
			</div>
			<p>Teachers</p>
			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>#</TableHead>
							<TableHead>Teacher Name</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{teachers.map((teacher, index) => (
							<TableRow key={index}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>
									{teacher.firstName} {teacher.lastName}
								</TableCell>
								<TableCell>
									<Link href={`./teachers/${teacher.clerkId}`}>
										<Button variant="outline">Edit</Button>
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export default AdminTeacherManagement;
