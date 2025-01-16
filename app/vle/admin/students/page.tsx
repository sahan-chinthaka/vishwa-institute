"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";

interface Student {
	_id: string;
	firstName: string;
	lastName: string;
	birthDate: string;
	grade: number;
	school: string;
	status: string;
}

export default function AdminStudentManagement() {
	const [students, setStudents] = useState<Student[]>([]);
	const [loading, setLoading] = useState(true);

	const handleApprove = async (studentId: string) => {
		try {
			const response = await fetch(`/api/vle/admin/students/${studentId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					status: "approved",
				}),
			});

			const data = await response.json();

			if (data.success) {
				// Refresh students list
				setStudents((prevStudents) =>
					prevStudents.filter((student) => student._id !== studentId),
				);
			}
		} catch (error) {
			console.error("Error approving student:", error);
		}
	};

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/vle/admin/students");
				const data = await response.json();

				if (data.success) {
					const pendingStudents = data.students.filter(
						(student: Student) => student.status === "pending",
					);
					setStudents(pendingStudents);
				}
			} catch (error: any) {
				alert(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchStudents();
	}, []);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<p className="text-lg font-medium">Loading students...</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-10">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Grade</TableHead>
						<TableHead>School</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{students.map((student) => (
						<TableRow key={student._id}>
							<TableCell>
								{student.firstName} {student.lastName}
							</TableCell>
							<TableCell>{student.grade}</TableCell>
							<TableCell>{student.school}</TableCell>
							<TableCell>{student.status}</TableCell>
							<TableCell>
								<Button
									onClick={() => handleApprove(student._id)}
									disabled={student.status === "approved"}
								>
									Approve
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
