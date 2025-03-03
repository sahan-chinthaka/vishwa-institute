"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { Search, User } from "lucide-react";
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

	const teachersToShow = filteredTeachers.slice(0, visibleRows * itemsPerRow);

	return (
		<div className="min-h-screen bg-gradient-to-b from-white to-green-50">
			<div className="container mx-auto px-4 py-12">
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-8 text-center text-4xl font-bold text-gray-900"
				>
					Our Expert Teachers
				</motion.h1>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mb-8 flex justify-center"
				>
					<div className="relative w-full max-w-md">
						<input
							type="text"
							placeholder="Search teachers by name"
							value={nameFilter}
							onChange={(e) => setNameFilter(e.target.value)}
							className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
						/>
						<Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
				>
					{teachersToShow.map((teacher, index) => (
						<motion.div
							key={teacher.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<Link href={`/teachers/${teacher.id}`} className="block h-full">
								<div className="group h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
									<div className="relative h-64 overflow-hidden">
										<img
											src={teacher.photo || "/placeholder.svg"}
											alt={teacher.name}
											className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
									</div>
									<div className="p-6">
										<h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-green-600">
											{teacher.name}
										</h3>
										<p className="flex items-center text-gray-600">
											<User className="mr-2 h-4 w-4" />
											Teacher
										</p>
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>

				{visibleRows * itemsPerRow < filteredTeachers.length && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.6 }}
						className="mt-12 text-center"
					>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleShowMore}
							className="rounded-lg bg-green-600 px-8 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-green-700"
						>
							See More Teachers
						</motion.button>
					</motion.div>
				)}
			</div>
			<Footer />
		</div>
	);
}
