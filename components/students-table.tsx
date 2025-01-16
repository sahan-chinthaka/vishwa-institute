import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

// Define the Student interface to match your MongoDB schema
interface Student {
	_id: string;
	indexNumber: string;
	firstName: string;
	lastName: string;
	birthDate?: Date;
	grade?: string;
	school: string;
	parentName?: string;
	phoneNumber: string;
	email: string;
	address?: string;
	status: string;
	clerkId?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

// Define props interface
interface StudentTableProps {
	data: Student[];
}

const StudentTable: React.FC<StudentTableProps> = ({ data }) => {
	const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
	const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
		new Set([
			"indexNumber",
			"firstName",
			"lastName",
			"grade",
			"school",
			"status",
		]),
	);

	const columns = [
		{ key: "indexNumber", label: "Index Number" },
		{ key: "firstName", label: "First Name" },
		{ key: "lastName", label: "Last Name" },
		{ key: "grade", label: "Grade" },
		{ key: "school", label: "School" },
		{ key: "phoneNumber", label: "Phone" },
		{ key: "email", label: "Email" },
		{ key: "status", label: "Status" },
	];

	// Log selected students whenever selection changes
	useEffect(() => {
		const selectedStudents = data.filter((student) =>
			selectedRows.has(student.indexNumber),
		);
		console.log("Selected Students:", selectedStudents);
	}, [selectedRows, data]);

	const toggleRow = (indexNumber: string) => {
		const newSelected = new Set(selectedRows);
		if (newSelected.has(indexNumber)) {
			newSelected.delete(indexNumber);
		} else {
			newSelected.add(indexNumber);
		}
		setSelectedRows(newSelected);
	};

	const toggleColumn = (columnKey: string) => {
		const newVisible = new Set(visibleColumns);
		if (newVisible.has(columnKey)) {
			newVisible.delete(columnKey);
		} else {
			newVisible.add(columnKey);
		}
		setVisibleColumns(newVisible);
	};

	return (
		<div className="w-full">
			<div className="mb-4 flex justify-between">
				<div className="text-sm text-gray-500">
					{selectedRows.size} students selected
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{columns.map((column) => (
							<DropdownMenuCheckboxItem
								key={column.key}
								className="capitalize"
								checked={visibleColumns.has(column.key)}
								onCheckedChange={() => toggleColumn(column.key)}
							>
								{column.label}
							</DropdownMenuCheckboxItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-12">Select</TableHead>
							{columns.map(
								(column) =>
									visibleColumns.has(column.key) && (
										<TableHead key={column.key} className="font-semibold">
											{column.label}
										</TableHead>
									),
							)}
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((student) => (
							<TableRow
								key={student._id}
								className={
									selectedRows.has(student.indexNumber) ? "bg-slate-100" : ""
								}
							>
								<TableCell>
									<input
										type="checkbox"
										checked={selectedRows.has(student.indexNumber)}
										onChange={() => toggleRow(student.indexNumber)}
										className="h-4 w-4"
									/>
								</TableCell>
								{columns.map(
									(column) =>
										visibleColumns.has(column.key) && (
											<TableCell key={column.key}>
												{student[column.key as keyof Student] instanceof Date
													? (
															student[column.key as keyof Student] as Date
														).toLocaleDateString()
													: String(student[column.key as keyof Student])}
											</TableCell>
										),
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default StudentTable;
