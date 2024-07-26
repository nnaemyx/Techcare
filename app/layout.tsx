import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Layout/Header";


export const metadata: Metadata = {
  title: "Tech Care",
  description: "The best healthcare technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-[#F6F7F8] px-[18px] py-[18px]">
        <Header/>
        {children}
      </body>
    </html>
  );
}
