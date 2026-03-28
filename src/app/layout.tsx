import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Raahi — The Complete Business Operating System for Indian Startups & SMBs",
  description: "From idea to operation — every legal, regulatory, financial, and administrative thing your business needs, in one place. Compliance Map, Financial Engine, Labour Law, Licenses, Govt Schemes, Credit Score, Documents & Alerts.",
  keywords: "compliance, Indian startups, SMB, GST, MCA, labour law, FSSAI, business compliance, startup India",
  openGraph: {
    title: "Raahi — Your Business Compliance Guide",
    description: "From idea to operation — every legal, regulatory, financial, and administrative thing your business needs, in one place.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
