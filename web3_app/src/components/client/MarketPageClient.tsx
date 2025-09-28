"use client";

import { useState } from "react";
import { Header } from "@/src/components/layout/Header";
import Sidebar from "@/src/components/layout/Sidebar";
import { SearchBar } from "@/src/components/common/SearchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { TrendingUp, TrendingDown, Flame } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

interface MockGlobalData {
  totalMarketCap: number;
  totalVolume: number;
  marketCapChange24h: number;
  bitcoinDominance: number;
  ethereumDominance: number;
  fearGreedIndex: {
    value: number;
    classification: string;
  };
}

interface MarketPageClientProps {
  globalData: MockGlobalData;
}

export function MarketPageClient({ globalData }: MarketPageClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const isMarketPositive = globalData.marketCapChange24h >= 0;

  return (
    <div className="min-h-screen bg-background">
      <Header
        variant="simplified"
        isMobileMenuOpen={sidebarOpen}
        setIsMobileMenuOpen={setSidebarOpen}
      />
      <div className="container mx-auto px-4">
        <div className="w-full max-w-[1536px] mx-auto flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 p-5">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">Thị trường tiền điện tử</h1>
                  <p className="text-muted-foreground mt-1">
                    Theo dõi giá, vốn hóa thị trường và khối lượng giao dịch của các đồng tiền mã hóa hàng đầu.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Link href="/market/trending">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Flame className="h-4 w-4" />
                      Các đồng tiền xu hướng
                    </Button>
                  </Link>
                  <div className="lg:w-96">
                    <SearchBar placeholder="Search cryptocurrencies..." />
                  </div>
                </div>
              </div>
              {/* Market Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Tổng Vốn hóa Thị trường
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {formatLargeNumber(globalData.totalMarketCap)}
                      </span>
                      <div
                        className={`flex items-center space-x-1 ${isMarketPositive
                          ? "text-coingecko-green-600"
                          : "text-red-600"
                          }`}
                      >
                        {isMarketPositive ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                          {isMarketPositive ? "+" : ""}
                          {globalData.marketCapChange24h.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Khối lượng giao dịch trong 24h
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <span className="text-2xl font-bold">
                      {formatLargeNumber(globalData.totalVolume)}
                    </span>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      BTC % thị phần
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {globalData.bitcoinDominance}%
                      </span>
                      <Badge variant="secondary">
                        ETH {globalData.ethereumDominance}%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Chỉ số Fear & Greed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {globalData.fearGreedIndex.value}
                      </span>
                      <Badge
                        variant={
                          globalData.fearGreedIndex.value > 50
                            ? "default"
                            : "secondary"
                        }
                        className={
                          globalData.fearGreedIndex.value > 75
                            ? "bg-coingecko-green-100 text-coingecko-green-800 dark:bg-coingecko-green-900 dark:text-coingecko-green-200"
                            : globalData.fearGreedIndex.value > 50
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }
                      >
                        {globalData.fearGreedIndex.classification}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Market Table */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
