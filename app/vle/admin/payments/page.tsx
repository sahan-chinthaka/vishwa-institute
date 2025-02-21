"use client";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Payment {
	amount: number;
	month: string;
	year: number;
	_id: string;
	studentRef: {
		_id: string;
		firstName: string;
		lastName: string;
		grade: string;
		year: number;
	};
}

function PaymentManagementPage() {
	const [classes, setClasses] = useState<null | any[]>(null);
	const [selectedClass, setSelectedClass] = useState("");

	useEffect(() => {
		axios.get(`/api/vle/admin/payment/classes`).then((res) => {
			if (res.data.classes) {
				setClasses(res.data.classes);
			}
		});
	}, []);

	const [payments, setPayments] = useState<null | Payment[]>(null);

	useEffect(() => {
		if (!selectedClass) return;
		console.log(selectedClass);

		axios
			.get("/api/vle/admin/payment/?class_id=" + selectedClass)
			.then((res) => {
				console.log(res.data);
				if (res.data.payments) {
					setPayments(res.data.payments);
				}
			});
	}, [selectedClass]);

	return (
		<div className="space-y-5 p-5">
			<div className="flex items-baseline">
				<h2>Payments</h2>
				<Link className="ml-auto" href="./payments/new-payment">
					<Button className="ml-auto">New Payment</Button>
				</Link>
			</div>
			<div>
				<label>Select the class</label>
				<Select
					onValueChange={(value) => setSelectedClass(value)}
					value={selectedClass}
				>
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
				{payments && (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>#</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead>Month</TableHead>
								<TableHead>Year</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{payments.map((payment, index) => (
								<TableRow key={payment._id}>
									<TableCell>{index + 1}</TableCell>
									<TableCell>
										{payment.studentRef.firstName} {payment.studentRef.lastName}
									</TableCell>
									<TableCell>{payment.amount}</TableCell>
									<TableCell>{payment.month}</TableCell>
									<TableCell>{payment.year}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</div>
		</div>
	);
}

export default PaymentManagementPage;
