import { Button } from "@/components/ui/button";
import Link from "next/link";

function AdminTeacherManagement() {
	return (
		<div>
			<div>
				<Link href="./teachers/new-teacher">
					<Button>New Teacher</Button>
				</Link>
			</div>
			Teacher
		</div>
	);
}

export default AdminTeacherManagement;
