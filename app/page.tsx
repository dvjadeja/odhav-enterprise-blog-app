import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import FeaturedCarousel from "@/components/landing/FeaturedCarousel";
import BlogListing from "@/components/landing/BlogListing";
import Footer from "@/components/landing/Footer";
import StructuredData from "@/components/landing/StructuredData";
import PageLoader from "@/components/landing/PageLoader";
import { getFeaturedArticles } from "@/lib/data/articles";

export const metadata: Metadata = {
  title:
    "Odhav Enterprise - Renewable Energy Construction & Infrastructure Solutions",
  description:
    "Leading provider of renewable energy construction and infrastructure solutions across India. Specializing in WTG foundations, solar installations, transmission lines, and wind farm development.",
  keywords: [
    "renewable energy",
    "wind turbine",
    "solar power",
    "construction",
    "infrastructure",
    "WTG foundation",
    "transmission lines",
    "Odhav Enterprise",
    "India",
    "green energy",
    "sustainable construction",
  ],
  authors: [{ name: "Odhav Enterprise" }],
  creator: "Odhav Enterprise",
  publisher: "Odhav Enterprise",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Odhav Enterprise - Renewable Energy Construction & Infrastructure Solutions",
    description:
      "Leading provider of renewable energy construction and infrastructure solutions across India.",
    url: "/",
    siteName: "Odhav Enterprise",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Odhav Enterprise - Renewable Energy Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Odhav Enterprise - Renewable Energy Construction & Infrastructure Solutions",
    description:
      "Leading provider of renewable energy construction and infrastructure solutions across India.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default async function HomePage() {
  const featuredArticles = getFeaturedArticles();

  return (
    <>
      <StructuredData />
      <PageLoader />
      <div
        className='min-h-screen flex flex-col landing-page-container'
        style={{
          clipPath: "polygon(0 48%, 0 48%, 0 52%, 0 52%)",
        }}
      >
        <Header />
        <main className='flex-1'>
          <FeaturedCarousel articles={featuredArticles} />
          <div id='projects'>
            <BlogListing />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
