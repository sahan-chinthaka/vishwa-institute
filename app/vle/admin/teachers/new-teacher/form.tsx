"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TeacherForm } from "@/lib/forms";
import { TeacherType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SearchItem } from "./page";
import { Textarea } from "@/components/ui/textarea";

function NewTeacherForm({ data }: { data: SearchItem }) {
	const form = useForm<TeacherType>({
		resolver: zodResolver(TeacherForm),
		defaultValues: {
			firstName: data.firstName,
			lastName: data.lastName,
			clerkId: data.id,
			education: "",
			subjects: "",
			description: "",
			phoneNumber: "",
		},
	});
	const [submitDisabled, setSubmitDisabled] = useState(false);
	const router = useRouter();

	function onSubmit(values: TeacherType) {
		setSubmitDisabled(true);
		axios
			.post("/api/vle/admin/teachers", values)
			.then((res) => {
				if (res.data.done) {
					alert("Teacher created successfully!");
					router.replace("./" + res.data.teacher.clerkId);
				} else setSubmitDisabled(false);
			})
			.catch(() => setSubmitDisabled(false));
	}

	return (
		<div className="mt-8">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="max-w-[800px] space-y-8"
				>
					<div className="flex flex-col gap-8 md:flex-row">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>First Name:</FormLabel>
									<FormControl>
										<Input placeholder="Richard" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel>Last Name:</FormLabel>
									<FormControl>
										<Input placeholder="Daniel" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="education"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Education:</FormLabel>
								<FormControl>
									<Input placeholder="Bsc Hons in Physics" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="subjects"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Subjects:</FormLabel>
								<FormControl>
									<Input placeholder="Arts, Mathematics" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phoneNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone Number:</FormLabel>
								<FormControl>
									<Input placeholder="Phone Number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description:</FormLabel>
								<FormControl>
									<Textarea
										placeholder="High skilled in teaching..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={submitDisabled} type="submit">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default NewTeacherForm;
