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
import Class from "@/models/class";
import { ClassType } from "@/lib/types";
import Link from "next/link";

async function AdminClassManagement() {
	await connectMongo();

	// Fetch classes from the database
	const classes = await Class.find<ClassType>();

	return (
		<div className="space-y-5 p-5">
			<div>
				<Link href="./classes/new-class">
					<Button>New Class</Button>
				</Link>
			</div>
			<p>Classes</p>
			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Class ID</TableHead>
							<TableHead>Class Name</TableHead>
							<TableHead>Description</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{classes.map((classItem, index) => (
							<TableRow key={index}>
								<TableCell>{classItem.classId}</TableCell>
								<TableCell>
									<Link href={`./VLE/Admin/Class-management/${classItem.name}`}>
										{classItem.name}
									</Link>
								</TableCell>
								<TableCell>{classItem.description}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export default AdminClassManagement;
