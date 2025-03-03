"use client";

import ClassImage from "@/assets/class.jpg";
import axios from "axios";
import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
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
		<div className="container mx-auto px-4 py-12">
			<motion.h1
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-8 text-center text-4xl font-bold text-gray-900"
			>
				Explore Our Classes
			</motion.h1>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
			>
				<div className="relative w-full max-w-md">
					<input
						type="text"
						placeholder="Filter by subject"
						value={nameFilter}
						onChange={(e) => setNameFilter(e.target.value)}
						className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
					/>
					<Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
				</div>
				<div className="relative w-full max-w-md">
					<input
						type="text"
						placeholder="Filter by grade"
						value={gradeFilter}
						onChange={(e) => setGradeFilter(e.target.value)}
						className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
					/>
					<BookOpen className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
			>
				{filteredClasses.slice(0, visibleClasses).map((classItem, index) => (
					<motion.div
						key={classItem.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<Link href={`/classes/${classItem.id}`} className="block h-full">
							<div className="group h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
								<div className="relative h-48 overflow-hidden">
									<img
										src={classItem.image || "/placeholder.svg"}
										alt={classItem.subject}
										className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								</div>
								<div className="p-6">
									<h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-green-600">
										{classItem.subject}
									</h3>
									<p className="text-gray-600">{classItem.grade}</p>
								</div>
							</div>
						</Link>
					</motion.div>
				))}
			</motion.div>

			{visibleClasses < filteredClasses.length && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className="mt-12 text-center"
				>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleSeeMore}
						className="rounded-lg bg-green-600 px-8 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-green-700"
					>
						See More Classes
					</motion.button>
				</motion.div>
			)}
		</div>
	);
}
