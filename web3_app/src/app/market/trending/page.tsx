import { TrendingPageClient } from "@/components/client/TrendingPageClient";
import { Metadata } from "next";

// Mock trending coins data

const mockTrendingStats = {
  totalTrending: 100,
  avgPriceChange: 6.23,
  topGainer: {
    name: "Pepe",
    symbol: "PEPE",
    change: 14.52,
  },
  totalSearchVolume: 6048000,
  updatedAt: new Date().toISOString(),
};

export const metadata: Metadata = {
  title: "Trending Cryptocurrencies | CryptoTracker",
  description:
    "Discover the most trending cryptocurrencies based on search volume, price movement, and market activity",
};

export default function TrendingPage() {
  return <TrendingPageClient trendingStats={mockTrendingStats} />;
}
