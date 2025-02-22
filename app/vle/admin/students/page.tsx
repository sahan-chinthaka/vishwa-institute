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
import Link from "next/link";

interface Student {
	_id: string;
	indexNumber: string;
	firstName: string;
	lastName: string;
	birthDate: string;
	grade: number;
	school: string;
	status: string;
}

export default function AdminStudentManagement() {
	const [students, setStudents] = useState<Student[]>([]);
	const [approvedStudents, setApprovedStudents] = useState<Student[]>([]);
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
					action: "approve",
				}),
			});

			const data = await response.json();

			if (data.success) {
				setStudents((prevStudents) =>
					prevStudents.filter((student) => student._id !== studentId),
				);
				fetchStudents();
			}
		} catch (error) {
			console.error("Error approving student:", error);
		}
	};

	const handleDelete = async (studentId: string) => {
		try {
			const response = await fetch(`/api/vle/admin/students/${studentId}`, {
				method: "DELETE",
			});

			if (response.ok) {
				setApprovedStudents((prevStudents) =>
					prevStudents.filter((student) => student._id !== studentId),
				);
			}
		} catch (error) {
			console.error("Error deleting student:", error);
		}
	};

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
				const approvedStudents = data.students.filter(
					(student: Student) => student.status === "approved",
				);
				setApprovedStudents(approvedStudents);
			}
		} catch (error: any) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
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
		<div className="container mx-auto px-4 py-10">
			{students.filter((student) => student.status === "pending").length >
				0 && (
				<div>
					<h2 className="mb-4 text-2xl font-bold">Pending Students</h2>
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
							{students
								.filter((student) => student.status === "pending")
								.map((student) => (
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
			)}

			<div>
				<h2 className="mb-4 text-2xl font-bold">Approved Students</h2>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Grade</TableHead>
							<TableHead>School</TableHead>
							<TableHead>Index Number</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{approvedStudents.map((student) => (
							<TableRow key={student._id}>
								<TableCell>
									{student.firstName} {student.lastName}
								</TableCell>
								<TableCell>{student.grade}</TableCell>
								<TableCell>{student.school}</TableCell>
								<TableCell>{student.indexNumber || "Not assigned"}</TableCell>
								<TableCell>{student.status}</TableCell>
								<TableCell>
									<div className="flex gap-2">
										<Link href={`/vle/admin/students/${student._id}/edit`}>
											<Button>Update</Button>
										</Link>
										<Button onClick={() => handleDelete(student._id)}>
											Delete
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
