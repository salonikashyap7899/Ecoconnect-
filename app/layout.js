import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CursorGlow from "@/components/CursorGlow";
import Magnetic from "@/components/Magnetic";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://ecoconnectservices.com"),
  title: {
    default: "Ecoconnect Services — Building the Capabilities Behind the Energy Transition",
    template: "%s — Ecoconnect Services",
  },
  description:
    "Ecoconnect Services integrates Skilling, Simulation, and Services to help industries develop talent, engineer reliable solutions, and execute clean energy and sustainable mobility projects.",
  keywords: ["clean energy", "sustainable mobility", "skilling", "simulation", "EV training", "renewable energy services", "battery energy storage"],
  openGraph: {
    type: "website",
    siteName: "Ecoconnect Services",
    title: "Ecoconnect Services — Building the Capabilities Behind the Energy Transition",
    description:
      "Skilling, Simulation, and Services for the clean energy and sustainable mobility ecosystem.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ecoconnect Services",
  url: "https://ecoconnectservices.com",
  description:
    "Execution-focused company enabling the transition towards clean energy and sustainable mobility through Skilling, Simulation, and Services.",
  email: "info@ecoconnectservices.com",
  telephone: "+91-99585-50225",
  address: {
    "@type": "PostalAddress",
    streetAddress: "512 Tower-A, DLF Corporate Greens",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  sameAs: ["https://linkedin.com/company/ecoconnect-services"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <SiteHeader />
        <main className="flex-1 pt-[76px]">{children}</main>
        <SiteFooter />
        <CursorGlow />
        <Magnetic />
      </body>
    </html>
  );
}
