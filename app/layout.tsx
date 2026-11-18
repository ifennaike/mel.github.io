import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Melvin & Co. — Make Curiosity Real",
  description: "A scroll-controlled world of games, ideas and discoveries built by Melvin and his dad.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
