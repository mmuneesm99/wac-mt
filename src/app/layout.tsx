import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";


const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Premium Basmati Rice - Premium Rice Co.",
  description: "Experience the finest quality basmati rice, carefully selected and processed to bring you the authentic taste of traditional Indian cuisine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
