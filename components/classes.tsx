"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Class {
	name: string;
	description: string;
	image: string;
}

const classes: Class[] = [
	{
		name: "Mathematics",
		description:
			"Comprehensive classes covering algebra, geometry, and calculus.",
		image: "/books.jpg",
	},
	{
		name: "Science",
		description: "Explore the world of physics, chemistry, and biology.",
		image: "/books.jpg",
	},
	{
		name: "English Literature",
		description:
			"Dive into classical and modern literature with expert guidance.",
		image: "/books.jpg",
	},
];

export default function Classes() {
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
				Explore Our Classes
			</h2>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{classes.map((classItem, index) => (
					<motion.div
						key={classItem.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
						className="group"
					>
						<div className="transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
							<div className="relative h-48 overflow-hidden">
								<img
									src={classItem.image || "/placeholder.svg"}
									alt={classItem.name}
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
								/>
								<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									<p className="-translate-y-4 transform font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
										Click to Learn More
									</p>
								</div>
							</div>
							<div className="space-y-4 p-6">
								<h3 className="text-xl font-semibold text-gray-900">
									{classItem.name}
								</h3>
								<p className="text-gray-600">{classItem.description}</p>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="w-full rounded-lg bg-green-600 px-6 py-3 font-medium text-white shadow-md transition-colors hover:bg-green-700"
								>
									Learn More
								</motion.button>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
