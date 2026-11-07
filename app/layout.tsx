import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Geist } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const displaySerif = DM_Serif_Display({
	variable: "--font-display-serif",
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "Men's Culture | Professional Men's Haircuts in Sydney CBD",
	description:
		"Precision men's haircuts, fades, beard trims and hot towel shaves for Sydney CBD professionals. Three locations: Sydney CBD, Martin Place and Circular Quay.",
};

export const viewport: Viewport = {
	themeColor: "#121418",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en-AU"
			className={`${geistSans.variable} ${displaySerif.variable} h-full antialiased`}
		>
			<body className="flex min-h-full flex-col">{children}</body>
		</html>
	);
}
