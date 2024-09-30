import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechM GCL 2024 Metaverse",
  description: "Tech Mahindra Global Chess League (TechM GCL) is the world’s first and largest official franchise chess league bringing fans together to witness the game in a never-seen-before avatar, a metaverse experience.",
  icons: "/logo-master.svg",
  openGraph: {
    type: "website",
    url: "https://gcl-meta-verse-git-master-akhilesh-jyotishis-projects.vercel.app/",
    title: "GCL Meta verse",
    description: "Tech Mahindra Global Chess League (TechM GCL) is the world’s first and largest official franchise chess league bringing fans together to witness the game in a never-seen-before avatar, a metaverse experience.",
    siteName: "GCL Meta verse",
    images: [{
      url: "https://gcl-meta-verse-git-master-akhilesh-jyotishis-projects.vercel.app/logo-master.svg",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
