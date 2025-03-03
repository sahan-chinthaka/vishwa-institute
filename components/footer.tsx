import { Facebook, Linkedin, Mail, Twitter, Youtube } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-green-50 py-12 text-gray-700">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
					{/* Contact Information */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-gray-900">
							Get In Touch
						</h3>
						<div className="space-y-2">
							<p className="text-gray-600">Vishwa Higher Educational Center</p>
							<p className="text-gray-600">224/1, Belihuloya</p>
							<p className="text-gray-600">Balangoda</p>
							<p className="flex items-center text-gray-600">
								<span className="mr-2">📞</span>
								+012 (345) 678 99
							</p>
						</div>
					</div>

					{/* Social Media Links */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold text-gray-900">Follow Us</h3>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-green-600 transition-colors hover:text-green-700"
							>
								<Facebook className="h-6 w-6" />
							</a>
							<a
								href="#"
								className="text-green-600 transition-colors hover:text-green-700"
							>
								<Twitter className="h-6 w-6" />
							</a>
							<a
								href="#"
								className="text-green-600 transition-colors hover:text-green-700"
							>
								<Youtube className="h-6 w-6" />
							</a>
							<a
								href="#"
								className="text-green-600 transition-colors hover:text-green-700"
							>
								<Linkedin className="h-6 w-6" />
							</a>
						</div>
						<p className="text-gray-600">
							© 2025 Vishwa Institute. All rights reserved.
						</p>
					</div>

					{/* Newsletter and Map */}
					<div className="space-y-6">
						<div className="space-y-4">
							<h3 className="text-xl font-semibold text-gray-900">
								Newsletter
							</h3>
							<form className="flex">
								<input
									type="email"
									placeholder="Enter your email"
									className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
									required
								/>
								<button
									type="submit"
									className="flex items-center rounded-r-lg bg-green-600 px-6 py-2 text-white transition-colors hover:bg-green-700"
								>
									<Mail className="h-5 w-5" />
								</button>
							</form>
						</div>

						<div className="space-y-4">
							<h3 className="text-xl font-semibold text-gray-900">Location</h3>
							<div className="overflow-hidden rounded-lg shadow-lg">
								<iframe
									title="Vishwa Institute Location"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.982650104286!2d80.69438057348377!3d6.649071721694482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3f350634e332f%3A0xa3c2c7ea5024b6a!2sVishwa%20Higher%20Education%20Institute!5e0!3m2!1sen!2slk!4v1736525145346!5m2!1sen!2slk"
									width="100%"
									height="200"
									style={{ border: 0 }}
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									className="w-full"
								></iframe>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
