"use client";

import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
	Button,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
	{ name: "Classes", href: "/classes" },
	{ name: "Teachers", href: "/teachers" },
	{ name: "News", href: "/news" },
	{ name: "Contact Us", href: "/contact-us" },
];

export default function NavBar() {
	const pathname = usePathname();

	return (
		<Disclosure as="nav" className="bg-gray-800">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						{/* Mobile menu button*/}
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							<Bars3Icon
								aria-hidden="true"
								className="block size-6 group-data-[open]:hidden"
							/>
							<XMarkIcon
								aria-hidden="true"
								className="hidden size-6 group-data-[open]:block"
							/>
						</DisclosureButton>
					</div>
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex shrink-0 items-center">
							<Link
								href="/"
								className="font-mono font-bold text-background transition-colors"
							>
								VISHWA
							</Link>
						</div>
						<div className="hidden sm:ml-6 sm:block">
							<div className="flex space-x-4">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										aria-current={
											pathname.startsWith(item.href) ? "page" : undefined
										}
										className={cn(
											pathname.startsWith(item.href)
												? "bg-gray-900 text-white"
												: "text-gray-300 hover:bg-gray-700 hover:text-white",
											"rounded-md px-3 py-2 text-sm font-medium",
										)}
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<SignedIn>
							<button
								type="button"
								className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
							>
								<span className="absolute -inset-1.5" />
								<span className="sr-only">View notifications</span>
								<BellIcon aria-hidden="true" className="size-6" />
							</button>
						</SignedIn>

						<div className="relative ml-3 flex justify-center">
							<SignedOut>
								<SignInButton>
									<Button className="rounded bg-primary px-4 py-2 text-sm text-foreground transition-colors data-[active]:bg-green-500 data-[hover]:bg-green-600">
										Sign In
									</Button>
								</SignInButton>
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</div>
					</div>
				</div>
			</div>

			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pb-3 pt-2">
					{navigation.map((item) => (
						<DisclosureButton
							key={item.name}
							as={Link}
							href={item.href}
							aria-current={pathname.startsWith(item.href) ? "page" : undefined}
							className={cn(
								pathname.startsWith(item.href)
									? "bg-gray-900 text-white"
									: "text-gray-300 hover:bg-gray-700 hover:text-white",
								"block rounded-md px-3 py-2 text-base font-medium",
							)}
						>
							{item.name}
						</DisclosureButton>
					))}
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}
