"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Girl from "../../assets/girl.jpeg";
import Footer from "../../components/footer";

interface Teacher {
	id: number;
	name: string;
	photo: string;
}

async function fetchTeachers() {
	const res = await axios.get("/api/teacher");

	const data: Teacher[] = res.data.teachers;

	return data.map((teacher: any) => ({
		id: teacher._id,
		name: (teacher.firstName + " " + teacher.lastName).trim(),
		photo: Girl.src,
	}));
}

export default function TeachersPage() {
	const [teachers, setTeachers] = useState<Teacher[]>([]);
	const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
	const [visibleRows, setVisibleRows] = useState(2);
	const [showAll] = useState(false);
	const [nameFilter, setNameFilter] = useState("");

	useEffect(() => {
		async function loadTeachers() {
			const data = await fetchTeachers();
			setTeachers(data);
			setFilteredTeachers(data);
		}
		loadTeachers();
	}, []);

	useEffect(() => {
		let filtered = teachers;

		if (nameFilter) {
			filtered = filtered.filter((teacher) =>
				teacher.name.toLowerCase().includes(nameFilter.toLowerCase()),
			);
		}

		setFilteredTeachers(filtered);
	}, [nameFilter, teachers]);

	const itemsPerRow = 4;

	const handleShowMore = () => {
		setVisibleRows((prev) => prev + 2);
	};

	const teachersToShow = showAll
		? filteredTeachers
		: filteredTeachers.slice(0, visibleRows * itemsPerRow);

	return (
		<div style={{ padding: "20px" }}>
			<div
				className="filters-container mb-5 text-center"
				style={{
					display: "flex",
					justifyContent: "center",
					gap: "20px",
					flexWrap: "wrap",
				}}
			>
				<input
					type="text"
					placeholder="Filter by name"
					value={nameFilter}
					onChange={(e) => setNameFilter(e.target.value)}
					className="filter-input rounded-md border bg-white px-4 py-2 text-black"
					style={{ minWidth: "250px" }}
				/>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{teachersToShow.map((teacher) => (
					<div
						key={teacher.id}
						className="transform cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-white transition-all duration-300 hover:scale-105 hover:bg-green-100 hover:shadow-lg"
					>
						<Link href={`/teachers/${teacher.id}`}>
							<img
								src={teacher.photo}
								alt={teacher.name}
								className="h-48 w-full object-cover"
							/>
							<div className="p-4">
								<p>
									<strong>Name:</strong> {teacher.name}
								</p>
							</div>
						</Link>
					</div>
				))}
			</div>

			{!showAll && visibleRows * itemsPerRow < filteredTeachers.length && (
				<div className="mt-5 text-center">
					<button
						onClick={handleShowMore}
						className="rounded-lg bg-green-600 px-6 py-2 text-white transition-colors duration-200 hover:bg-green-700"
					>
						See More
					</button>
				</div>
			)}
			<Footer />
		</div>
	);
}
