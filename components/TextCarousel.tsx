"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const TextCarousel = () => {
	const slides = [
		{
			id: 1,
			title: "2025/2026 A/L Biology Classes Begin!",
			description:
				"New tuition classes have begun! Join us now for expert guidance, interactive lessons, and exam-focused learning to achieve your academic goals.",
		},
		{
			id: 2,
			title: "Boost Your Grades with Expert Tutoring!",
			description:
				"Our latest tuition sessions are now open for enrollment! Join us for focused learning, exam preparation, and a supportive study environment to help you excel in your subjects.",
		},
		{
			id: 3,
			title: "Enroll Now - New Science Classes Open!",
			description:
				"Exciting new tuition classes have started! Don't miss the chance to learn from expert tutors with personalized guidance and interactive lessons. Secure your spot today",
		},
	];

	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
	};

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
		);
	};

	return (
		<div className="container mx-auto max-w-4xl px-4">
			<h2 className="mb-8 text-center text-3xl font-bold text-gray-900 md:text-4xl">
				Latest Announcements
			</h2>
			<div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentIndex}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className="space-y-4"
					>
						<h3 className="text-2xl font-semibold text-green-600">
							{slides[currentIndex].title}
						</h3>
						<p className="text-lg text-gray-600">
							{slides[currentIndex].description}
						</p>
					</motion.div>
				</AnimatePresence>

				<button
					onClick={handlePrev}
					className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-green-600 text-white transition-colors hover:bg-green-700"
				>
					&#8249;
				</button>
				<button
					onClick={handleNext}
					className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-green-600 text-white transition-colors hover:bg-green-700"
				>
					&#8250;
				</button>
			</div>

			<div className="mt-6 flex justify-center space-x-3">
				{slides.map((slide, index) => (
					<button
						key={slide.id}
						onClick={() => setCurrentIndex(index)}
						className={`h-3 w-3 rounded-full transition-all ${
							index === currentIndex
								? "w-6 bg-green-600"
								: "bg-gray-300 hover:bg-green-400"
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default TextCarousel;
