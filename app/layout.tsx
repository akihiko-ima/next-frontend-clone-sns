import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/auth";
import { serverFetch } from "@/lib/serverApiClient";

export const metadata: Metadata = {
  title: "Clone-SNS | Next15",
  description: "Clone-SNS | Next15",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialUser = null;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (token) {
      const data = await serverFetch("/users/me");
      initialUser = data.user;
    }
  } catch {}

  return (
    <html lang="ja">
      <body className="bg-gray-100">
        <AuthProvider initialUser={initialUser}>
          {children}
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
