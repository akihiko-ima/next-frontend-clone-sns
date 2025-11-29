import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/auth";

export const metadata: Metadata = {
  title: "Clone-SNS | Next15",
  description: "Clone-SNS | Next15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <AuthProvider>
        <body className="bg-gray-100">{children}</body>
        <Toaster position="top-center" />
      </AuthProvider>
    </html>
  );
}
