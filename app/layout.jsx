import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  preload: true,
});

export const metadata = {
  title: "Trusted SEO Agency in Indonesia | Limadata — SEO & GEO Agency",
  description: "Limadata is Indonesia's trusted SEO agency. We help Indonesian businesses reach #1 on Google and appear in AI Overviews, ChatGPT & Gemini. Free SEO audit in 48 hours.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
