import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

function PaymentManagementPage() {
	return (
		<div className="p-5 space-y-5">
			<div className="flex items-baseline">
				<h2>Payments</h2>
				<Link className="ml-auto" href="./payments/new-payment">
					<Button className="ml-auto">New Payment</Button>
				</Link>
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
		</div>
	);
}

export default PaymentManagementPage;
