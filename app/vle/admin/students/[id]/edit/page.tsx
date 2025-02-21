"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Student {
	_id: string;
	firstName: string;
	lastName: string;
	birthDate: string;
	grade: number;
	school: string;
	parentName: string;
	phoneNumber: string;
	email: string;
	address: string;
}

export default function Page() {
	const params = useParams();
	const { id } = params as { id: string };
	const [student, setStudent] = useState<Student | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchStudent = async () => {
			try {
				setLoading(true);
				const response = await fetch(`/api/vle/admin/students/${id}`);
				if (!response.ok) {
					throw new Error("Failed to fetch student");
				}
				const data = await response.json();
				setStudent(data.student);
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (id) fetchStudent();
	}, [id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setStudent(
			(prevStudent) =>
				({
					...prevStudent,
					[name]: value,
				}) as Student,
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await fetch(`/api/vle/admin/students/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(student),
			});

			if (!response.ok) {
				throw new Error("Failed to update student");
			}

			router.push("/vle/admin/students");
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!student) {
		return <div>Student not found</div>;
	}

	return (
		<div className="container mx-auto py-10">
			<h1 className="mb-4 text-2xl font-bold">Edit Student</h1>
			<form onSubmit={handleSubmit} className="max-w-lg">
				<div className="mb-4">
					<label
						htmlFor="firstName"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						First Name
					</label>
					<Input
						type="text"
						id="firstName"
						name="firstName"
						value={student.firstName || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="lastName"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Last Name
					</label>
					<Input
						type="text"
						id="lastName"
						name="lastName"
						value={student.lastName || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="birthDate"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Birth Date
					</label>
					<Input
						type="date"
						id="birthDate"
						name="birthDate"
						value={student.birthDate || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="grade"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Grade
					</label>
					<Input
						type="number"
						id="grade"
						name="grade"
						value={student.grade || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="school"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						School
					</label>
					<Input
						type="text"
						id="school"
						name="school"
						value={student.school || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="parentName"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Parent Name
					</label>
					<Input
						type="text"
						id="parentName"
						name="parentName"
						value={student.parentName || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="phoneNumber"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Phone Number
					</label>
					<Input
						type="tel"
						id="phoneNumber"
						name="phoneNumber"
						value={student.phoneNumber || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Email
					</label>
					<Input
						type="email"
						id="email"
						name="email"
						value={student.email || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="address"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Address
					</label>
					<Input
						type="text"
						id="address"
						name="address"
						value={student.address || ""}
						onChange={handleChange}
					/>
				</div>
				<Button
					type="submit"
					className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
				>
					Update Student
				</Button>
			</form>
		</div>
	);
}
