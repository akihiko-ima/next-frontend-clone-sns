import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/context/auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div>
        <NavBar />
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
