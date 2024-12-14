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

function TeacherEditForm({ teacher }: { teacher: TeacherType }) {
	const form = useForm<TeacherType>({
		resolver: zodResolver(TeacherForm),
		defaultValues: {
			firstName: teacher.firstName,
			lastName: teacher.lastName,
			clerkId: teacher.clerkId,
			education: teacher.education,
		},
	});
	const router = useRouter();
	const [updateDisabled, setUpdateDisabled] = useState(false);

	function onSubmit(values: TeacherType) {
		setUpdateDisabled(true);

		axios
			.put(`/api/vle/admin/teachers/${teacher.clerkId}`, values)
			.then((res) => {
				console.log(res.data);
			})
			.finally(() => setUpdateDisabled(false));
	}

	return (
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
									<Input autoComplete="off" placeholder="Richard" {...field} />
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
									<Input autoComplete="off" placeholder="Daniel" {...field} />
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
								<Input
									autoComplete="off"
									placeholder="Bsc Hons in Physics"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={updateDisabled} type="submit">
					Update
				</Button>
				<Button
					variant="destructive"
					className="ml-2"
					type="button"
					disabled={updateDisabled}
					onClick={() => {
						if (!confirm("Do you want to delete?")) return;
						setUpdateDisabled(true);
						axios
							.delete(`/api/vle/admin/teachers/${teacher.clerkId}`)
							.then((res) => {
								if (res.data.done) {
									router.replace("../teachers");
								}
							})
							.finally(() => setUpdateDisabled(false));
					}}
				>
					Delete
				</Button>
			</form>
		</Form>
	);
}

export default TeacherEditForm;
