import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	weight: ["400", "700"],
	subsets: ["latin"],
	style: ["normal"],
});

export const metadata: Metadata = {
	title: "Vishwa Higher Education Institute",
	description: "This is the official website for Vishwa Higher Education Institute in Balangoda, Sri Lanka.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={poppins.className}>{children}</body>
		</html>
	);
}
