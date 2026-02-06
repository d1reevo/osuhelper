import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers"; // We'll create this for SessionProvider + QueryClientProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "osu!Helper",
  description: "Advanced osu! dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground dark`}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
