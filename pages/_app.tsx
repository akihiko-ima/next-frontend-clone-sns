import type { AppProps } from "next/app";

import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/context/auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div>
        <NavBar />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
