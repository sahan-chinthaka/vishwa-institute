"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/debounce";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

function PaymentManagementPage() {
	const now = new Date();
	const [studentID, setStudentID] = useState("");
	const debStudentId = useDebounce(studentID, 500);
	const [student, setStudent] = useState<undefined | null | { name: string }>(
		undefined,
	);
	const formRef = useRef<HTMLFormElement>(null);
	const [disabled, setDisabled] = useState(false);
	const [classes, setClasses] = useState<null | any[]>(null);

	useEffect(() => {
		axios.get(`/api/vle/admin/payment/classes`).then((res) => {
			if (res.data.classes) {
				setClasses(res.data.classes);
			}
		});
	}, []);

	useEffect(() => {
		setStudent(undefined);
		if (!debStudentId) return;
		axios
			.get(`/api/vle/admin/payment/student/?index_no=${debStudentId}`)
			.then((res) => {
				console.log(res.data);
				if (res.data.success) {
					setStudent({
						name: (
							res.data.student.firstName +
							" " +
							res.data.student.lastName
						).trim(),
					});
				} else {
					setStudent(null);
				}
			});
	}, [debStudentId, classes]);

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		if (!formRef.current) return;
		setDisabled(false);
		e.preventDefault();
		const formData = new FormData(formRef.current);
		console.log(Object.fromEntries(formData.entries()));

		setDisabled(true);
		axios
			.post("/api/vle/admin/payment", Object.fromEntries(formData.entries()))
			.then((res) => {
				if (res.data.success) {
					alert("Payment added successfully");
				} else {
					alert("Failed: " + res.data.message);
				}
			})
			.finally(() => {
				setDisabled(false);
			});
	}

	return (
		<form ref={formRef} onSubmit={onSubmit}>
			<div className="space-y-5 p-5">
				<div className="flex">
					<Link href="./">
						<ArrowLeft size={24} className="mr-2 text-primary" />
					</Link>
					<h2 className="text-xl font-bold text-primary">New Payment</h2>
				</div>
				<div>
					<label>Select the class</label>
					<Select name="class_name" disabled={classes === null}>
						<SelectTrigger className="max-w-72">
							<SelectValue placeholder="Select the class" />
						</SelectTrigger>
						<SelectContent>
							{classes &&
								classes.map((_class: any) => (
									<SelectItem key={_class._id} value={_class._id}>
										{_class.name}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</div>
				<div>
					<label>Enter the student ID</label>
					<Input
						value={studentID}
						onChange={(e) => setStudentID(e.target.value)}
						placeholder="Enter the student ID"
						className="max-w-72"
						name="index_no"
					/>
					{student && <div className="my-2">{student.name}</div>}
					{student === null && (
						<div className="my-2">Student not found with: {studentID}</div>
					)}
				</div>
				<div>
					<label>Enter the amount</label>
					<div className="relative flex max-w-72 rounded-lg shadow-sm shadow-black/5">
						<Input
							className="-me-px rounded-e-none ps-6 shadow-none"
							placeholder="0.00"
							type="text"
							name="amount"
						/>
						<span className="-z-10 inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground">
							LKR
						</span>
					</div>
				</div>
				<div className="xs:flex-row flex max-w-72 flex-col gap-5">
					<div className="flex-1">
						<Label>Month</Label>
						<Select name="month">
							<SelectTrigger>
								<SelectValue placeholder="Month" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								<SelectItem value="January">January</SelectItem>
								<SelectItem value="February">February</SelectItem>
								<SelectItem value="March">March</SelectItem>
								<SelectItem value="April">April</SelectItem>
								<SelectItem value="May">May</SelectItem>
								<SelectItem value="June">June</SelectItem>
								<SelectItem value="July">July</SelectItem>
								<SelectItem value="August">August</SelectItem>
								<SelectItem value="September">September</SelectItem>
								<SelectItem value="October">October</SelectItem>
								<SelectItem value="November">November</SelectItem>
								<SelectItem value="December">December</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="flex-1">
						<Label>Year</Label>
						<Select name="year">
							<SelectTrigger>
								<SelectValue placeholder="Year" />
							</SelectTrigger>
							<SelectContent>
								{Array.from({ length: 10 }).map((_, i) => (
									<SelectItem key={i} value={now.getFullYear() - 5 + i + ""}>
										{now.getFullYear() - 5 + i}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				<Button disabled={disabled || !student || !classes} type="submit">
					Create Payment
				</Button>
			</div>
		</form>
	);
}

export default PaymentManagementPage;
