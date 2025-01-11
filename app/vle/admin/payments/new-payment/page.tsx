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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function PaymentManagementPage() {
	const now = new Date();

	return (
		<div className="space-y-5 p-5">
			<div className="flex">
				<Link href="./">
					<ArrowLeft size={24} className="mr-2 text-primary" />
				</Link>
				<h2 className="text-xl font-bold text-primary">New Payment</h2>
			</div>
			<div>
				<label>Select the class</label>
				<Select>
					<SelectTrigger className="max-w-72">
						<SelectValue placeholder="Select the class" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="a/l-maths-2024">A/L Maths - 2024</SelectItem>
						<SelectItem value="a/l-bio-2023">A/L Bio - 2023</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div>
				<label>Enter the student ID</label>
				<Input placeholder="Enter the student ID" className="max-w-72" />
			</div>
			<div>
				<label>Enter the amount</label>
				<div className="relative flex max-w-72 rounded-lg shadow-sm shadow-black/5">
					<Input
						className="-me-px rounded-e-none ps-6 shadow-none"
						placeholder="0.00"
						type="text"
					/>
					<span className="-z-10 inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm text-muted-foreground">
						LKR
					</span>
				</div>
			</div>
			<div className="flex max-w-72 flex-col gap-5 xs:flex-row">
				<div className="flex-1">
					<Label>Month</Label>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Month" />
						</SelectTrigger>
						<SelectContent>
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
					<Select>
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
			<Button>Create Payment</Button>
		</div>
	);
}

export default PaymentManagementPage;
