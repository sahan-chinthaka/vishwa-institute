"use client";
import English from "@/assets/english.png";
import Mathematics from "@/assets/mathematics.jpg";
import Science from "@/assets/science.jpeg";
import Footer from "@/components/footer";
import Link from "next/link";
import { useState } from "react";

const TeacherClassInfo = () => {
	const [classData] = useState<any[]>([]);
	const [errorMessage] = useState<string>("");
	const [showAllClasses, setShowAllClasses] = useState(false);

	const dummyClasses = [
		{ className: "Mathematics", grade: "Grade 10", image: Mathematics.src },
		{ className: "Science", grade: "Grade 9", image: Science.src },
		{ className: "English", grade: "Grade 8", image: English.src },
		{ className: "Mathematics", grade: "Grade 10", image: Mathematics.src },
		{ className: "Science", grade: "Grade 9", image: Science.src },
		{ className: "English", grade: "Grade 8", image: English.src },
		{ className: "Mathematics", grade: "Grade 10", image: Mathematics.src },
		{ className: "Science", grade: "Grade 9", image: Science.src },
	];

	return (
		<div>
			{errorMessage ? (
				<div>
					<div className="mb-4 text-red-500">{errorMessage}</div>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{dummyClasses
							.slice(0, showAllClasses ? dummyClasses.length : 4)
							.map((dummyClass, index) => (
								<Link
									key={index}
									href={`/vle/teacher/${dummyClass.className.toLowerCase()}`} // Redirecting to the class-specific page
									passHref
								>
									<div className="transform cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-white transition-all duration-300 hover:scale-105 hover:bg-green-100 hover:shadow-lg">
										<div className="h-40 overflow-hidden">
											<img
												src={dummyClass.image}
												alt={dummyClass.className}
												className="h-full w-full object-cover"
											/>
										</div>

										<div className="bg-green-100 p-4">
											<h2 className="text-lg font-bold">
												{dummyClass.className}
											</h2>
											<p className="text-sm">Grade: {dummyClass.grade}</p>
										</div>
									</div>
								</Link>
							))}
					</div>

					<div className="mt-6 text-center">
						<button
							className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
							onClick={() => setShowAllClasses(!showAllClasses)}
						>
							{showAllClasses ? "Show Less" : "See More"}
						</button>
					</div>
				</div>
			) : (
				classData.length > 0 && (
					<div>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{classData
								.slice(0, showAllClasses ? classData.length : 4)
								.map((classItem, index) => (
									<Link
										key={index}
										href={`/vle/teacher/${classItem.className.toLowerCase()}`}
										passHref
									>
										<div className="transform cursor-pointer overflow-hidden rounded-lg border border-gray-300 bg-white transition-all duration-300 hover:scale-105 hover:bg-green-100 hover:shadow-lg">
											<div className="h-40 overflow-hidden">
												<img
													src={classItem.image || Mathematics.src}
													alt={classItem.className}
													className="h-full w-full object-cover"
												/>
											</div>

											<div className="bg-green-100 p-4">
												<h2 className="text-lg font-bold">
													{classItem.className}
												</h2>
												<p className="text-sm">Grade: {classItem.grade}</p>
											</div>
										</div>
									</Link>
								))}
						</div>

						<div className="mt-6 text-center">
							<button
								className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
								onClick={() => setShowAllClasses(!showAllClasses)}
							>
								{showAllClasses ? "Show Less" : "See More"}
							</button>
						</div>
					</div>
				)
			)}
			<Footer />
		</div>
	);
};

export default TeacherClassInfo;
