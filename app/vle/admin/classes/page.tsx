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

interface ClassType {
	_id: string;
	name: string;
	description: string;
	grade: string;
	email: string;
	clerkId: string;
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
				setNewClass({ name: "", description: "", grade: "", email: "" }); // Reset form
			} else {
				setError(data.error || "Failed to create class");
			}
		} catch (error: any) {
			setError(error.message || "Failed to create class");
		}
	};

	useEffect(() => {
		fetchClasses();
	}, []);

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<p className="text-lg font-medium">Loading classes...</p>
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
						<TableHead>Email</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{classes.map((cls) => (
						<TableRow key={cls._id}>
							<TableCell>{cls.name}</TableCell>
							<TableCell>{cls.description}</TableCell>
							<TableCell>{cls.grade}</TableCell>
							<TableCell>{cls.email}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
