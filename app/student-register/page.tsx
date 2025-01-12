"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";

function StudentRegister() {
	const [formData, setFormData] = useState({
		fullName: "",
		firstName: "",
		age: "",
		grade: "",
		school: "",
		parentName: "",
		phoneNumber: "",
		email: "",
		address: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/vle/admin/student", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) throw new Error("Failed to register student");
			console.log(await response.json());
			alert("Student registered successfully!");
		} catch (error) {
			console.error(error);
			alert("Failed to register student");
		}
	};

	return (
		<div className="mx-auto w-full max-w-2xl px-4 py-6">
			<form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
				{[
					{ label: "Full Name", name: "fullName", type: "text" },
					{ label: "First Name", name: "firstName", type: "text" },
					{ label: "Age", name: "age", type: "number" },
					{ label: "Grade", name: "grade", type: "number" },
					{ label: "School", name: "school", type: "text" },
					{ label: "Parent Name", name: "parentName", type: "text" },
					{ label: "Phone", name: "phoneNumber", type: "tel" },
					{ label: "Email", name: "email", type: "email" },
					{ label: "Address", name: "address", type: "text" },
				].map((field) => (
					<div key={field.name} className="flex flex-col gap-2">
						<label htmlFor={field.name} className="text-sm font-medium">
							{field.label}
						</label>
						<Input
							id={field.name}
							type={field.type}
							name={field.name}
							value={formData[field.name as keyof typeof formData]}
							onChange={handleChange}
							placeholder={field.label}
							className="w-full"
						/>
					</div>
				))}

				<Button type="submit" className="mt-6 w-full sm:w-auto">
					Register Student
				</Button>
			</form>
		</div>
	);
}

export default StudentRegister;
