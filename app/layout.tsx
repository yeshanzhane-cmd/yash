import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Alpha X — AI Company OS",
  description: "Command center for the AI agents running your company.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${display.variable} ${body.variable} font-body bg-canvas text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
