import { MarketPageClient } from "@/components/client/pages/MarketPageClient";

// Mock data for the market page

const mockGlobalData = {
  totalMarketCap: 1734567890123,
  totalVolume: 89567890123,
  marketCapChange24h: 2.15,
  bitcoinDominance: 48.7,
  ethereumDominance: 16.5,
  fearGreedIndex: {
    value: 72,
    classification: "Greed",
  },
};

export default function MarketPage() {
  return <MarketPageClient globalData={mockGlobalData} />;
}
