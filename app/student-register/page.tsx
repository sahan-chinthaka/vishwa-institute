"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, FormEvent } from "react";

function StudentRegister() {
	const initialFormState = {
		firstName: "",
		lastName: "",
		birthDate: "",
		grade: "",
		school: "",
		parentName: "",
		phoneNumber: "",
		email: "",
		address: "",
	};

	const [formData, setFormData] = useState(initialFormState);
	const [isSubmitting, setIsSubmitting] = useState(false);

	console.log(isSubmitting);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/vle/admin/students", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
					grade: Number(formData.grade),
					birthDate: new Date(formData.birthDate).toISOString(),
					status: "pending",
					clerkId: "clerkId",
				}),
			});

			const data = await response.json();
			console.log(data);

			if (!response.ok) {
				throw new Error(data.error || "Failed to submit");
			}

			alert("Student registered successfully!");
			setFormData(initialFormState);
		} catch (error: any) {
			console.error("Error:", error);
			alert(error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="mx-auto w-full max-w-2xl px-4 py-6">
			<form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
				{[
					{ label: "First Name", name: "firstName", type: "text" },
					{ label: "Last Name", name: "lastName", type: "text" },
					{ label: "Birthday", name: "birthDate", type: "date" },
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
							disabled={isSubmitting}
						/>
					</div>
				))}

				<Button
					type="submit"
					className="mt-6 w-full sm:w-auto"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Registering..." : "Register Student"}
				</Button>
			</form>
		</div>
	);
}

export default StudentRegister;
