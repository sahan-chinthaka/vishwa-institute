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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SearchItem } from "./page";
import { useState } from "react";
import { useRouter } from "next/navigation";

function NewTeacherForm({ data }: { data: SearchItem }) {
	const form = useForm<z.infer<typeof TeacherForm>>({
		resolver: zodResolver(TeacherForm),
		defaultValues: {
			firstName: data.firstName,
			lastName: data.lastName,
			clerkId: data.id,
			education: "",
		},
	});
	const [submitDisabled, setSubmitDisabled] = useState(false);
	const router = useRouter();

	function onSubmit(values: z.infer<typeof TeacherForm>) {
		setSubmitDisabled(true);
		axios
			.post("/api/vle/admin/teachers", values)
			.then((res) => {
				if (res.data.done) {
					alert("Teacher created successfully!");
					router.replace("./" + res.data.teacher._id);
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
					<Button disabled={submitDisabled} type="submit">
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default NewTeacherForm;
