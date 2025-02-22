interface AttendanceRecord {
	date: string;
	status: "present" | "absent";
}

const AttendanceTab = () => {
	const attendance: AttendanceRecord[] = [];

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200">
				<thead>
					<tr>
						<th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
							Date
						</th>
						<th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
							Status
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 bg-white">
					{attendance.length === 0 ? (
						<tr>
							<td colSpan={2} className="px-6 py-4 text-center text-gray-500">
								No attendance records found
							</td>
						</tr>
					) : (
						attendance.map((record, index) => (
							<tr key={index}>
								<td className="whitespace-nowrap px-6 py-4">{record.date}</td>
								<td className="whitespace-nowrap px-6 py-4">
									<span
										className={`rounded-full px-2 py-1 text-xs ${
											record.status === "present"
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{record.status}
									</span>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default AttendanceTab;
