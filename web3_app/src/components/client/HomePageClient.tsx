"use client";

import React from "react";
import { TrendingCoins } from "@/components/market/TrendingCoins";
import { FeaturedNews } from "@/components/news/FeaturedNews";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Star } from "lucide-react";

interface MockTrendingCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCap: number;
  volume24h: number;
  sparkline: number[];
  rank: number;
}

interface MockNewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  sourceUrl: string;
  source: string;
  category:
    | "bitcoin"
    | "ethereum"
    | "defi"
    | "nft"
    | "regulation"
    | "market"
    | "technology";
  readTime: number;
  tags: string[];
}

interface MockPortfolio {
  id: string;
  name: string;
  totalValue: number;
  totalCost: number;
  totalPnL: number;
  totalPnLPercentage: number;
  dayChange: number;
  dayChangePercentage: number;
  holdings: Array<{
    coinId: string;
    symbol: string;
    name: string;
    amount: number;
    currentValue: number;
    allocation: number;
    priceChange24h: number;
  }>;
}

interface HomePageClientProps {
  trendingCoins: MockTrendingCoin[];
  newsArticles: MockNewsArticle[];
  portfolio: MockPortfolio;
}

export function HomePageClient({
  trendingCoins,
  newsArticles,
}: HomePageClientProps) {
  const handleAddToWatchlist = (coinId: string) => {
    console.log("Add to watchlist:", coinId);
    // Implement add to watchlist functionality
  };

  const handleAddToPortfolio = (coinId: string) => {
    console.log("Add to portfolio:", coinId);
    // Implement add to portfolio functionality
  };

  return (
    <>
      {/* Market Overview Section */}

      {/* Hero Section with Trending & Hot Lists */}
      <section className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-coingecko-green-500" />
                🔥 Trending
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-xs text-muted-foreground"
                >
                  View more
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: "Bitcoin", symbol: "BTC", change: 2.4 },
                  { name: "Toncoin", symbol: "TON", change: 2.6 },
                  { name: "Manyu", symbol: "MANYU", change: 63.3 },
                ].map((coin, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-muted-foreground w-4 text-center">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {coin.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {coin.symbol}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs text-coingecko-green-500 border-coingecko-green-500"
                    >
                      +{coin.change}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />⭐ Hot
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-xs text-muted-foreground"
                >
                  View more
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 gap-2">
                {[
                  { name: "Sui", symbol: "SUI", change: 8.9 },
                  { name: "Avalanche", symbol: "AVAX", change: 5.2 },
                  { name: "Fantom", symbol: "FTM", change: 12.1 },
                ].map((coin, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-muted-foreground w-4 text-center">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {coin.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {coin.symbol}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs text-coingecko-green-500 border-coingecko-green-500"
                    >
                      +{coin.change}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Column - Trending Coins */}
        <div className="lg:col-span-1">
          <TrendingCoins
            coins={trendingCoins}
            onAddToWatchlist={handleAddToWatchlist}
            onAddToPortfolio={handleAddToPortfolio}
          />
        </div>

        {/* Right Column - Featured News + Portfolio + Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <FeaturedNews articles={newsArticles} />
        </div>
      </div>
    </>
  );
}
