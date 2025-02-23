import Class from "@/models/class";
import Payment from "@/models/payment";
import Student from "@/models/student";

const PaymentsTab = async ({
	classId,
	studentId,
}: {
	classId: string;
	studentId: string;
}) => {
	const studentRef = await Student.findOne({
		clerkId: studentId,
	});

	const classRef = await Class.findById(classId);

	const payments = await Payment.find({
		classRef,
		studentRef,
	});

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200">
				<thead>
					<tr>
						<th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
							Month
						</th>
						<th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
							Year
						</th>
						<th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
							Amount
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 bg-white">
					{payments.length === 0 ? (
						<tr>
							<td colSpan={3} className="px-6 py-4 text-center text-gray-500">
								No payment records found
							</td>
						</tr>
					) : (
						payments.map((payment) => (
							<tr key={payment.id}>
								<td className="whitespace-nowrap px-6 py-4">{payment.month}</td>
								<td className="whitespace-nowrap px-6 py-4">{payment.year}</td>
								<td className="whitespace-nowrap px-6 py-4">
									{payment.amount}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default PaymentsTab;
