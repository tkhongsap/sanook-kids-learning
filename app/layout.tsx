import type { Metadata, Viewport } from "next";
import "./globals.css";
import GAScript from "@/components/analytics/GAScript";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanook-kids-learning.vercel.app';
const ogImageUrl = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  title: "Sanook Kids Learning - เรียนฟรี ป.4 และ ป.6 คณิตศาสตร์ วิทยาศาสตร์",
  description: "เรียนฟรีออนไลน์ คณิตศาสตร์และวิทยาศาสตร์สำหรับ ป.4 และ ป.6 วิดีโอสั้น แบบฝึกหัดไม่จำกัด ติดตามผลการเรียน สอดคล้องหลักสูตรไทย 100% ฟรีตลอดไป",
  keywords: ["เรียนฟรี", "ป.4", "ป.6", "คณิตศาสตร์", "วิทยาศาสตร์", "เรียนออนไลน์", "Khan Academy", "แบบฝึกหัด", "วิดีโอการสอน", "หลักสูตรไทย"],
  authors: [{ name: "Sanook Kids Learning" }],
  creator: "Sanook Kids Learning",
  publisher: "Sanook Kids Learning",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Sanook Kids Learning - เรียนฟรี ป.4 และ ป.6 คณิตศาสตร์ วิทยาศาสตร์",
    description: "เรียนฟรีออนไลน์ คณิตศาสตร์และวิทยาศาสตร์สำหรับ ป.4 และ ป.6 วิดีโอสั้น แบบฝึกหัดไม่จำกัด สอดคล้องหลักสูตรไทย 100% ฟรีตลอดไป",
    type: "website",
    locale: "th_TH",
    url: siteUrl,
    siteName: "Sanook Kids Learning",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Sanook Kids Learning - แพลตฟอร์มการเรียนรู้ฟรีสำหรับนักเรียนไทย",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanook Kids Learning - เรียนฟรี ป.4 และ ป.6",
    description: "เรียนฟรีออนไลน์ คณิตศาสตร์และวิทยาศาสตร์สำหรับ ป.4 และ ป.6 วิดีโอสั้น แบบฝึกหัดไม่จำกัด สอดคล้องหลักสูตรไทย",
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaOrgData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Sanook Kids Learning",
    "description": "แพลตฟอร์มการเรียนรู้ฟรีออนไลน์สำหรับนักเรียนไทยชั้น ป.4 และ ป.6 เน้นคณิตศาสตร์และวิทยาศาสตร์",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      // Social media links will be added when available
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TH"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Thailand"
    },
    "availableLanguage": {
      "@type": "Language",
      "name": "Thai",
      "alternateName": "th"
    },
    "educationalCredentialAwarded": "None",
    "offers": {
      "@type": "Offer",
      "category": "Educational",
      "price": "0",
      "priceCurrency": "THB",
      "availability": "https://schema.org/InStock"
    },
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "นักเรียนชั้น ป.4 และ ป.6"
    },
    "teaches": ["คณิตศาสตร์", "วิทยาศาสตร์", "Mathematics", "Science"],
    "keywords": "เรียนฟรี, ป.4, ป.6, คณิตศาสตร์, วิทยาศาสตร์, เรียนออนไลน์"
  };

  return (
    <html lang="th">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
        />
      </head>
      <body className="antialiased">
        <GAScript />
        {children}
      </body>
    </html>
  );
}

