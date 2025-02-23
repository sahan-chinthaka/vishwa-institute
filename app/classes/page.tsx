"use client";

import ClassImage from "@/assets/class.jpg";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Class {
	id: number;
	subject: string;
	grade: string;
	image: string;
}

async function fetchClasses(): Promise<Class[]> {
	const res = await axios.get("/api/class");

	const classes: any[] = res.data.classes;

	return classes.map((_class) => ({
		id: _class._id,
		subject: _class.name,
		grade: _class.grade,
		image: ClassImage.src,
	}));
}

export default function ClassesPage() {
	const [classes, setClasses] = useState<Class[]>([]);
	const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
	const [visibleClasses, setVisibleClasses] = useState<number>(8);

	const [nameFilter, setNameFilter] = useState("");
	const [gradeFilter, setGradeFilter] = useState("");

	useEffect(() => {
		async function loadClasses() {
			const data = await fetchClasses();
			setClasses(data);
			setFilteredClasses(data);
		}
		loadClasses();
	}, []);

	useEffect(() => {
		let filtered = classes;

		if (nameFilter) {
			filtered = filtered.filter((classItem) =>
				classItem.subject.toLowerCase().includes(nameFilter.toLowerCase()),
			);
		}

		if (gradeFilter) {
			filtered = filtered.filter((classItem) =>
				classItem.grade.toLowerCase().includes(gradeFilter.toLowerCase()),
			);
		}

		setFilteredClasses(filtered);
	}, [nameFilter, gradeFilter, classes]);

	const handleSeeMore = () => {
		setVisibleClasses((prev) => prev + 8);
	};

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
					placeholder="Filter by subject"
					value={nameFilter}
					onChange={(e) => setNameFilter(e.target.value)}
					className="filter-input rounded-md border bg-white px-4 py-2 text-black"
					style={{ minWidth: "250px" }}
				/>
				<input
					type="text"
					placeholder="Filter by grade"
					value={gradeFilter}
					onChange={(e) => setGradeFilter(e.target.value)}
					className="filter-input rounded-md border bg-white px-4 py-2 text-black"
					style={{ minWidth: "250px" }}
				/>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{filteredClasses.slice(0, visibleClasses).map((classItem) => (
					<div
						key={classItem.id}
						className="transform cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-white transition-all duration-300 hover:scale-105 hover:bg-green-100 hover:shadow-lg"
					>
						<Link href={`/classes/${classItem.id}`}>
							<img
								src={classItem.image}
								alt={classItem.subject}
								className="h-48 w-full object-cover"
							/>
							<div className="p-4">
								<strong>{classItem.subject}</strong>
								<p>{classItem.grade}</p>
							</div>
						</Link>
					</div>
				))}
			</div>

			{visibleClasses < filteredClasses.length && (
				<div className="mt-5 text-center">
					<button
						onClick={handleSeeMore}
						className="rounded-lg bg-green-600 px-6 py-2 text-white transition-colors duration-200 hover:bg-green-700"
					>
						See More
					</button>
				</div>
			)}
		</div>
	);
}
