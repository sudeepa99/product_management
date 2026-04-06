import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme/theme-provider";
import { Toaster } from "../components/ui/sonner";

export const metadata: Metadata = {
  title: "ProductHub",
  description: "Modern SaaS product management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
