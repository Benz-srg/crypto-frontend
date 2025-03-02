"use client";
import { useState } from "react";
import Link from "next/link";

import { ToastContainer } from "@/hooks/useToast";

import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 flex items-center ">
          <Link href="/" className="font-bold">
            Crypto Tracker
          </Link>
        </nav>
        <ToastContainer />

        {children}
      </body>
    </html>
  );
}
