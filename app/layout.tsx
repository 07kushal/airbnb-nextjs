// "use server";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modals/Modal";

const nunitoFont = Nunito({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunitoFont.className}>
        <Modal isOpen title={"hello world"} actionLabel="Submit" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
