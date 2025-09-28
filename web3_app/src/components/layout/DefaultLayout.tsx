"use client";

import React, { useState } from "react";
import { Header } from "@/src/components/layout/Header";
import Sidebar from "@/src/components/layout/Sidebar";
import { Footer } from "@/src/components/layout/Footer";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header
        variant="simplified"
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 overflow-x-hidden">
          <div className="w-full max-w-[1530px] mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
