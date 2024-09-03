import { Header } from "@/components/Header";
import { SupportedChainCheck } from "@/components/SupportedChainCheck";
import { Toaster } from "@/components/ui/sonner";
import { METADATA } from "@/config";
import "@/globals.css";
import { Providers } from "@/lib/providers";
import { cn } from "@/lib/utils";
import { wagmiConfig } from "@/lib/wagmi";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: METADATA.name,
  description: METADATA.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "leading-7")}>
        <Providers initialState={initialState}>
          <Header />
          <main className="w-full px-4 mx-auto max-w-[48.875rem]">
            {children}
          </main>
          <Toaster />
          <SupportedChainCheck />
        </Providers>
      </body>
    </html>
  );
}
