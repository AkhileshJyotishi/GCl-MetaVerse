import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://gcl-meta-verse.vercel.app/'),
  title: "TechM GCL 2024 Metaverse",
  description: "Tech Mahindra Global Chess League (TechM GCL) is the world’s first and largest official franchise chess league bringing fans together to witness the game in a never-seen-before avatar, a metaverse experience.",
  icons: "/favicon.ico",
  openGraph: {
    type: "website",
    url: "https://gcl-meta-verse.vercel.app/",
    title: "TechM GCL 2024 Metaverse",
    description: "Tech Mahindra Global Chess League (TechM GCL) is the world’s first and largest official franchise chess league bringing fans together to witness the game in a never-seen-before avatar, a metaverse experience.",
    siteName: "TechM GCL 2024 Metaverse",
    images: [{
      url: "/favicon.ico",
    }],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics/>
      <ToastContainer />
        {children}</body>
    </html>
  );
}
