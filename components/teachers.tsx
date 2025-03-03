"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Teacher {
	name: string;
	description: string;
	image: string;
}

const teachers: Teacher[] = [
	{
		name: "Mr. Akila Viraj",
		description:
			"High skilled in teaching mathematics and problem-solving techniques",
		image: "/sir2.jpg",
	},
	{
		name: "Mr. Nimal Perera",
		description:
			"Experienced teacher with a passion for teaching science and technology.",
		image: "/teacher1.jpg",
	},
	{
		name: "Mr. Ajith Fernando",
		description:
			"Skilled in teaching mathematics and problem-solving techniques.",
		image: "/teacher3.jpg",
	},
];

export default function Teachers() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	return (
		<div className="container mx-auto px-4">
			<h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
				Meet Our Expert Teachers
			</h2>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{teachers.map((teacher, index) => (
					<motion.div
						key={teacher.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						className="group"
					>
						<div className="transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
							<div className="relative h-64 overflow-hidden">
								<img
									src={teacher.image || "/placeholder.svg"}
									alt={teacher.name}
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</div>
							<div className="space-y-4 p-6">
								<h3 className="text-xl font-semibold text-gray-900">
									{teacher.name}
								</h3>
								<p className="text-gray-600">{teacher.description}</p>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="w-full rounded-lg bg-green-600 px-6 py-3 font-medium text-white shadow-md transition-colors hover:bg-green-700"
								>
									View Profile
								</motion.button>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
