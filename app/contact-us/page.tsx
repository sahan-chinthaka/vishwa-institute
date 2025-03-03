"use client";

import About1 from "@/assets/about1.jpg";
import About2 from "@/assets/about2.jpg";
import Founder from "@/assets/founder.jpg";
import Girl from "@/assets/girl.jpeg";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

function ContactUsPage() {
	const aboutPhotos = [About1.src, About1.src, About2.src, About2.src];
	const historyPhotos = [About1.src, About1.src, About2.src, About2.src];
	const teamMembers = [
		{
			id: 1,
			name: "S. Kahingala",
			position: "Founder",
			contactNumber: "+94 712345678",
			email: "kahingala@vishwa.edu",
			photo: Founder.src,
		},
		{
			id: 2,
			name: "Nimal",
			position: "Coordinator",
			contactNumber: "+94 773456789",
			email: "nimal@vishwa.edu",
			photo: Girl.src,
		},
		{
			id: 3,
			name: "Malani",
			position: "Administrator",
			contactNumber: "+94 702345678",
			email: "malani@vishwa.edu",
			photo: Girl.src,
		},
		{
			id: 4,
			name: "Kamal",
			position: "Assistant Manager",
			contactNumber: "+94 752345678",
			email: "kamal@vishwa.edu",
			photo: Girl.src,
		},
	];

	return (
		<main className="bg-gradient-to-b from-white to-green-50">
			<div className="container mx-auto px-4 py-12">
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-16"
				>
					<h1 className="mb-8 text-center text-4xl font-bold text-gray-900 md:text-5xl">
						About Vishwa Institute
					</h1>
					<div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
						{aboutPhotos.map((photo, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Image
									src={photo || "/placeholder.svg"}
									alt={`About photo ${index + 1}`}
									width={800}
									height={600}
									className="rounded-lg object-cover shadow-lg"
								/>
							</motion.div>
						))}
					</div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="text-center text-lg text-gray-700"
					>
						<p className="mb-4">
							Vishwa Institute is a premier educational institution dedicated to
							fostering academic excellence and holistic development. Known for
							its innovative teaching methods and state-of-the-art facilities,
							the institute has become a beacon of quality education, catering
							to diverse academic and professional aspirations.
						</p>
						<p>
							The institute emphasizes practical learning, integrating modern
							technology and hands-on experiences into its curriculum to bridge
							the gap between theoretical knowledge and real-world applications.
							Its well-stocked libraries, cutting-edge laboratories, and
							collaborative learning spaces provide students with an environment
							that encourages exploration and innovation.
						</p>
					</motion.div>
				</motion.section>

				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mb-16"
				>
					<h2 className="mb-8 text-center text-4xl font-bold text-gray-900 md:text-5xl">
						Our History
					</h2>
					<div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
						{historyPhotos.map((photo, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Image
									src={photo || "/placeholder.svg"}
									alt={`History photo ${index + 1}`}
									width={800}
									height={600}
									className="rounded-lg object-cover shadow-lg"
								/>
							</motion.div>
						))}
					</div>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="text-center text-lg text-gray-700"
					>
						<p className="mb-4">
							The history of Vishwa Institute is a testament to the
							transformative power of vision, determination, and commitment to
							education. Founded by the visionary Mr. S. Kahingala, the
							institute began as a humble initiative with a singular goal: to
							provide accessible, high-quality education to students from
							diverse backgrounds.
						</p>
						<p>
							Today, Vishwa Institute stands as a proud symbol of educational
							excellence, with a legacy built on the values of inclusivity,
							perseverance, and innovation. It continues to inspire generations
							of students and educators, staying true to its founder&apos;s vision of
							shaping a brighter future through the power of education.
						</p>
					</motion.div>
				</motion.section>

				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mb-16"
				>
					<h2 className="mb-8 text-center text-4xl font-bold text-gray-900 md:text-5xl">
						Our Founder
					</h2>
					<div className="flex flex-col items-center gap-8 lg:flex-row">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6 }}
						>
							<Image
								src={Founder.src || "/placeholder.svg"}
								alt="Founder"
								width={400}
								height={400}
								className="rounded-lg object-cover shadow-xl"
							/>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<h3 className="mb-4 text-2xl font-semibold text-gray-900">
								Mr. S Kahingala
							</h3>
							<p className="text-lg text-gray-700">
								Mr. S. Kahingala, the founder of Vishwa Institute, is a
								trailblazing visionary and an inspiring leader who has dedicated
								his life to revolutionizing education. With a profound passion
								for learning and an unwavering commitment to empowering
								individuals, he established Vishwa Institute to bridge the gap
								between traditional teaching methods and the evolving demands of
								the modern world.
							</p>
						</motion.div>
					</div>
				</motion.section>

				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="mb-16"
				>
					<h2 className="mb-8 text-center text-4xl font-bold text-gray-900 md:text-5xl">
						Contact Our Team
					</h2>
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{teamMembers.map((member, index) => (
							<motion.div
								key={member.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="group overflow-hidden rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
							>
								<div className="mb-4 overflow-hidden rounded-full">
									<Image
										src={member.photo || "/placeholder.svg"}
										alt={member.name}
										width={120}
										height={120}
										className="h-32 w-32 object-cover transition-transform duration-300 group-hover:scale-110"
									/>
								</div>
								<h3 className="mb-1 text-xl font-semibold text-gray-900">
									{member.name}
								</h3>
								<p className="mb-4 text-sm text-gray-600">{member.position}</p>
								<div className="space-y-2">
									<p className="flex items-center text-sm text-gray-700">
										<Phone className="mr-2 h-4 w-4 text-green-600" />
										{member.contactNumber}
									</p>
									<p className="flex items-center text-sm text-gray-700">
										<Mail className="mr-2 h-4 w-4 text-green-600" />
										<a
											href={`mailto:${member.email}`}
											className="transition-colors hover:text-green-600"
										>
											{member.email}
										</a>
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.section>
			</div>
			<Footer />
		</main>
	);
}

export default ContactUsPage;
