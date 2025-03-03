"use client";

import { cn } from "@/lib/utils";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
	useUser,
} from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
	{ name: "Classes", href: "/classes" },
	{ name: "Teachers", href: "/teachers" },
	{ name: "News", href: "/news" },
	{ name: "Contact Us", href: "/contact-us" },
];

export default function NavBar() {
	const pathname = usePathname();
	const user = useUser();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="relative flex h-20 items-center justify-between">
					{/* Logo */}
					<Link
						href="/"
						className="flex items-center space-x-2 font-mono text-xl font-bold text-green-600 transition-colors hover:text-green-700"
					>
						VISHWA
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex md:space-x-1">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									"relative px-4 py-2 text-sm font-medium transition-colors",
									pathname.startsWith(item.href)
										? "text-green-600"
										: "text-gray-600 hover:text-green-600",
								)}
							>
								{item.name}
								{pathname.startsWith(item.href) && (
									<motion.div
										layoutId="navbar-active"
										className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
										initial={false}
									/>
								)}
							</Link>
						))}
						{user.isLoaded && user.isSignedIn && (
							<Link
								href="/vle"
								className={cn(
									"relative px-4 py-2 text-sm font-medium transition-colors",
									pathname.startsWith("/vle")
										? "text-green-600"
										: "text-gray-600 hover:text-green-600",
								)}
							>
								VLE
								{pathname.startsWith("/vle") && (
									<motion.div
										layoutId="navbar-active"
										className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
										initial={false}
									/>
								)}
							</Link>
						)}
					</div>

					{/* Auth Buttons */}
					<div className="flex items-center space-x-4">
						<SignedIn>
							<button
								type="button"
								className="relative rounded-full p-2 text-gray-600 transition-colors hover:text-green-600"
							>
								<span className="sr-only">View notifications</span>
								<div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
									/>
								</svg>
							</button>
							<UserButton
								appearance={{
									elements: {
										avatarBox: "w-10 h-10",
									},
								}}
							/>
						</SignedIn>
						<SignedOut>
							<SignInButton>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
								>
									Sign In
								</motion.button>
							</SignInButton>
						</SignedOut>

						{/* Mobile Menu Button */}
						<button
							className="rounded-lg p-2 text-gray-600 transition-colors hover:text-green-600 md:hidden"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							<Menu className="h-6 w-6" />
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="overflow-hidden border-t border-gray-200 bg-white md:hidden"
					>
						<div className="space-y-1 px-4 py-4">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										"block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
										pathname.startsWith(item.href)
											? "bg-green-50 text-green-600"
											: "text-gray-600 hover:bg-gray-50 hover:text-green-600",
									)}
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{item.name}
								</Link>
							))}
							{user.isLoaded && user.isSignedIn && (
								<Link
									href="/vle"
									className={cn(
										"block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
										pathname.startsWith("/vle")
											? "bg-green-50 text-green-600"
											: "text-gray-600 hover:bg-gray-50 hover:text-green-600",
									)}
									onClick={() => setIsMobileMenuOpen(false)}
								>
									VLE
								</Link>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}
