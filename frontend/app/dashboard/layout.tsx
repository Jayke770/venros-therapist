import type { Metadata } from "next";
import NavBar from "@/app/dashboard/navBar";
export const metadata: Metadata = {
    title: "Company",
    description: "The best company",
};

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}
