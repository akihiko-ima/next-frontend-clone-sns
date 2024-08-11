import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Timeline from "@/components/Timeline";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Clone-SNS | Next14</title>
      </Head>

      <div>
        <Timeline />
      </div>
    </>
  );
}
