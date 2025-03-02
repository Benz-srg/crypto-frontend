"use client";
import Link from "next/link";
import "./globals.css";
import { useState } from "react";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import AddCryptoForm from "@/components/AddCryptoForm";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
          <Link href="/" className="font-bold">
            Crypto Tracker
          </Link>
          <Button onClick={() => setIsDialogOpen(true)}>Add Crypto</Button>
        </nav>

        {children}

        <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <AddCryptoForm closeDialog={() => setIsDialogOpen(false)} />
        </Dialog>
      </body>
    </html>
  );
}
