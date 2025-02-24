"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface ClassType {
	_id: string;
	name: string;
	description: string;
	grade: string;
	clerkId: string;
}

interface StudentType {
	_id: string;
	firstName: string;
	lastName: string;
}

export default function AdminClassesPage() {
	const [classes, setClasses] = useState<ClassType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [open, setOpen] = useState(false);
	const [newClass, setNewClass] = useState({
		name: "",
		description: "",
		grade: "",
		email: "",
	});
	const [students, setStudents] = useState<StudentType[]>([]);
	const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
	const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

	const fetchClasses = async () => {
		try {
			setLoading(true);
			const response = await fetch("/api/vle/admin/classes");
			const data = await response.json();

			if (data.success) {
				setClasses(data.classes);
			} else {
				setError(data.error || "Failed to fetch classes");
			}
		} catch (error: any) {
			setError(error.message || "Failed to fetch classes");
		} finally {
			setLoading(false);
		}
	};

	const fetchStudents = async () => {
		try {
			const response = await fetch("/api/vle/admin/students");
			const data = await response.json();

			if (data.success) {
				setStudents(data.students);
			} else {
				setError(data.error || "Failed to fetch students");
			}
		} catch (error: any) {
			setError(error.message || "Failed to fetch students");
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setNewClass((prevClass) => ({
			...prevClass,
			[name]: value,
		}));
	};

	const handleCreateClass = async () => {
		try {
			const response = await fetch("/api/vle/admin/classes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newClass),
			});

			const data = await response.json();

			if (data.success) {
				fetchClasses();
				setOpen(false);
				setNewClass({ name: "", description: "", grade: "", email: "" });
			} else {
				setError(data.error || "Failed to create class");
			}
		} catch (error: any) {
			setError(error.message || "Failed to create class");
		}
	};

	const handleAssignStudents = async () => {
		try {
			if (!selectedClassId) {
				setError("Please select a class");
				return;
			}

			const response = await fetch(
				`/api/vle/admin/classes/${selectedClassId}/students`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ studentIds: selectedStudents }),
				},
			);

			const data = await response.json();

			if (data.success) {
				alert("Students assigned successfully!");
				setSelectedClassId(null);
				setSelectedStudents([]);
			} else {
				setError(data.error || "Failed to assign students");
			}
		} catch (error: any) {
			setError(error.message || "Failed to assign students");
		}
	};

	useEffect(() => {
		fetchClasses();
		fetchStudents();
	}, []);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<p className="text-lg font-medium">Loading...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<p className="text-lg font-medium text-red-500">Error: {error}</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-10">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">Classes</h1>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant="outline">Add Class</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Add Class</DialogTitle>
							<DialogDescription>
								Create a new class by entering the details below.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input
									id="name"
									name="name"
									value={newClass.name}
									onChange={handleInputChange}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="description" className="text-right">
									Description
								</Label>
								<Input
									id="description"
									name="description"
									value={newClass.description}
									onChange={handleInputChange}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="grade" className="text-right">
									Grade
								</Label>
								<Input
									type="text"
									id="grade"
									name="grade"
									value={newClass.grade}
									onChange={handleInputChange}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="email" className="text-right">
									Email
								</Label>
								<Input
									type="email"
									id="email"
									name="email"
									value={newClass.email}
									onChange={handleInputChange}
									className="col-span-3"
								/>
							</div>
						</div>
						<Button onClick={handleCreateClass}>Create Class</Button>
					</DialogContent>
				</Dialog>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Grade</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{classes.map((cls) => (
						<TableRow key={cls._id}>
							<TableCell>{cls.name}</TableCell>
							<TableCell>{cls.description}</TableCell>
							<TableCell>{cls.grade}</TableCell>
							<TableCell>
								<Button
									variant="secondary"
									onClick={() => setSelectedClassId(cls._id)}
								>
									Assign Students
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{selectedClassId && (
				<div className="mt-4">
					<h2 className="text-lg font-bold">Assign Students to Class</h2>
					<Select
						onValueChange={(value) => {
							setSelectedStudents((prev) => {
								if (prev.includes(value)) {
									return prev.filter((v) => v !== value);
								} else {
									return [...prev, value];
								}
							});
						}}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select students" />
						</SelectTrigger>
						<SelectContent>
							{students.map((student) => (
								<SelectItem key={student._id} value={student._id}>
									{student.firstName} {student.lastName}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button className="mt-2" onClick={handleAssignStudents}>
						Assign Selected Students
					</Button>
				</div>
			)}
		</div>
	);
}
