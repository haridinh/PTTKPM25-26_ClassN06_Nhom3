"use client";

import { useState } from "react";
import Sidebar from "@/src/components/layout/Sidebar";
import { Card, CardContent } from "@/src/components/ui/card";

import { TrendingUp, Flame, Users, BarChart3 } from "lucide-react";

import { Header } from "@/src/components/layout/Header";

interface TrendingStats {
  totalTrending: number;
  avgPriceChange: number;
  topGainer: {
    name: string;
    symbol: string;
    change: number;
  };
  totalSearchVolume: number;
  updatedAt: string;
}

interface TrendingPageClientProps {
  trendingStats: TrendingStats;
}

export function TrendingPageClient({ trendingStats }: TrendingPageClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const formatSearchVolume = (volume: number) => {
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(0)}K`;
    return volume.toLocaleString();
  };

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
          <main className="container flex-1 mx-autop-5 space-y-8">
            {/* Header Section */}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Flame className="h-6 w-6 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Tổng xu hướng
                      </p>
                      <p className="text-2xl font-bold">
                        {trendingStats.totalTrending}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Trung bình giá thay đổi
                      </p>
                      <p className="text-2xl font-bold text-green-500">
                        +{trendingStats.avgPriceChange}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Tổng khối lượng tìm kiếm
                      </p>
                      <p className="text-2xl font-bold">
                        {formatSearchVolume(trendingStats.totalSearchVolume)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Tăng giá mạnh nhất
                      </p>
                      <p className="text-lg font-bold">
                        {trendingStats.topGainer.symbol} +
                        {trendingStats.topGainer.change}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
