import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: { absolute: "Admin | Men's Culture" },
	description: "Sign in to manage the Men's Culture promotion banner.",
	robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
	return children;
}
