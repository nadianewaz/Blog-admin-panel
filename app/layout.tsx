import type {Metadata} from "next";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {Inter} from "next/font/google";
import "@/styles/app.scss";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Brritto",
    description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AntdRegistry>
            {children}
        </AntdRegistry>
        </body>
        </html>
    );
}
