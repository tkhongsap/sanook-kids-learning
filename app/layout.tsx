import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanook Kids Learning - เรียนฟรี ป.4 และ ป.6 คณิตศาสตร์ วิทยาศาสตร์",
  description: "เรียนฟรีออนไลน์ คณิตศาสตร์และวิทยาศาสตร์สำหรับนักเรียนชั้น ป.4 และ ป.6 เน้นการเรียนรู้ด้วยการพิชิต สอดคล้องกับหลักสูตรไทย",
  keywords: ["เรียนฟรี", "ป.4", "ป.6", "คณิตศาสตร์", "วิทยาศาสตร์", "เรียนออนไลน์"],
  authors: [{ name: "Sanook Kids Learning" }],
  openGraph: {
    title: "Sanook Kids Learning - เรียนฟรี ป.4 และ ป.6",
    description: "แพลตฟอร์มการเรียนรู้ฟรีสำหรับนักเรียนไทย ป.4 และ ป.6",
    type: "website",
    locale: "th_TH",
    siteName: "Sanook Kids Learning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanook Kids Learning",
    description: "เรียนฟรีออนไลน์ คณิตศาสตร์และวิทยาศาสตร์",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

