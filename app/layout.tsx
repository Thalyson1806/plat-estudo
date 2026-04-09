import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SessionProviderWrapper } from "@/components/SessionProviderWrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PyEstudo — Material de estudo Python",
  description: "Material de revisão de Python para graduação em Engenharia de Software. 12 tópicos com exemplos e exercícios.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body className="min-h-screen flex flex-col">
        <SessionProviderWrapper>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer
            className="text-center py-6 text-sm"
            style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}
          >
            PyEstudo — Engenharia de Software UMC
          </footer>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
