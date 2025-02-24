"use client";

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function VLEAdminLayout({ children }: { children: React.ReactNode }) {
	const [panelExpanded, setPanelExpanded] = useState(false);
	const pathname = usePathname();

	return (
		<div className="flex">
			<div
				className={cn(
					"absolute top-1/2 w-6 cursor-pointer rounded-r bg-gray-800 py-2 text-white transition-[left] md:hidden",
					panelExpanded ? "left-64" : "left-0",
				)}
				onClick={() => setPanelExpanded((a) => !a)}
			>
				{panelExpanded ? (
					<ChevronLeftIcon width={24} />
				) : (
					<ChevronRightIcon width={24} />
				)}
			</div>
			<div
				className={cn(
					"absolute top-16 h-[calc(100vh-64px)] min-w-64 bg-gray-800 p-2 text-background transition-[left] md:static",
					panelExpanded ? "left-0" : "-left-64",
				)}
			>
				<div className="mb-10">
					<Link href="/vle/admin">
						<h3 className="text-center text-lg font-semibold">Admin Panel</h3>
					</Link>
					<p className="text-center text-gray-300">Vishwa Institute</p>
				</div>
				<ul className="text-gray-300">
					<li>
						<Link
							href="/vle/admin/students"
							className={cn(
								pathname.startsWith("/vle/admin/students") && "bg-gray-900",
								"inline-block w-full rounded p-2 transition-colors hover:text-gray-100",
							)}
						>
							Student Management
						</Link>
					</li>
					<li>
						<Link
							href="/vle/admin/teachers"
							className={cn(
								pathname.startsWith("/vle/admin/teachers") && "bg-gray-900",
								"inline-block w-full rounded p-2 transition-colors hover:text-gray-100",
							)}
						>
							Teacher Management
						</Link>
					</li>
					<li>
						<Link
							href="/vle/admin/payments"
							className={cn(
								pathname.startsWith("/vle/admin/payments") && "bg-gray-900",
								"inline-block w-full rounded p-2 transition-colors hover:text-gray-100",
							)}
						>
							Payment Management
						</Link>
					</li>
					<li>
						<Link
							href="/vle/admin/classes"
							className={cn(
								pathname.startsWith("/vle/admin/classes") && "bg-gray-900",
								"inline-block w-full rounded p-2 transition-colors hover:text-gray-100",
							)}
						>
							Class Management
						</Link>
					</li>
				</ul>
			</div>
			<aside className="h-[calc(100vh-64px)] w-full overflow-auto">
				{children}
			</aside>
		</div>
	);
}

export default VLEAdminLayout;
