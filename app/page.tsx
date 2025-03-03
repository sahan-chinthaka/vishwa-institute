import classImage from "@/assets/class.jpg";
import Classes from "@/components/classes";
import Footer from "@/components/footer";
import Teachers from "@/components/teachers";
import TextCarousel from "@/components/TextCarousel";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col bg-gradient-to-b from-white to-green-50">
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-16 md:py-24">
				<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
					<div className="animate-fade-in-left space-y-6">
						<h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
							We Value Your <span className="text-green-600">Future!</span>
						</h1>
						<p className="max-w-xl text-lg text-gray-600 md:text-xl">
							Empowering students with knowledge and resources to thrive in
							their careers and futures.
						</p>
						<div className="transition-transform duration-300 hover:scale-105 active:scale-95">
							<Link
								href="/classes"
								className="inline-flex items-center rounded-lg bg-green-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl"
							>
								Get Started
								<svg
									className="ml-2 h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</Link>
						</div>
					</div>
					<div className="relative animate-fade-in-right overflow-hidden rounded-2xl shadow-2xl">
						<Image
							src={classImage || "/placeholder.svg"}
							alt="Students learning in a modern classroom"
							className="h-[500px] w-full object-cover"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
					</div>
				</div>
			</section>

			{/* Announcements Section */}
			<section className="bg-white py-16">
				<TextCarousel />
			</section>

			{/* Teachers Section */}
			<section className="bg-green-50 py-16">
				<Teachers />
			</section>

			{/* Classes Section */}
			<section className="bg-white py-16">
				<Classes />
			</section>

			{/* Footer */}
			<Footer />
		</main>
	);
}
