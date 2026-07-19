import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CursorGlow from "@/components/CursorGlow";
import Magnetic from "@/components/Magnetic";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white">
        <SiteHeader />
        <main className="flex-1 pt-[76px]">{children}</main>
        <SiteFooter />
        <CursorGlow />
        <Magnetic />
      </body>
    </html>
  );
}
