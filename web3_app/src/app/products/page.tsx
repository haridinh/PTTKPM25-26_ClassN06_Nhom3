"use client";

import { useState } from "react";
import { Header } from "@/src/components/layout/Header";
import Sidebar from "@/src/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Smartphone,
  Monitor,
  Database,
  BarChart3,
  Shield,
  Globe,
  ChevronRight,
  Star,
} from "lucide-react";

const products = [
  {
    id: "mobile-app",
    name: "CoinGecko Mobile App",
    description:
      "Track your crypto portfolio on the go with our award-winning mobile app",
    icon: Smartphone,
    features: [
      "Real-time prices",
      "Portfolio tracking",
      "Price alerts",
      "News & analysis",
    ],
    category: "Mobile",
    rating: 4.8,
    downloads: "10M+",
    platforms: ["iOS", "Android"],
  },
  {
    id: "terminal",
    name: "CoinGecko Terminal",
    description:
      "Professional trading platform with advanced analytics and institutional features",
    icon: Monitor,
    features: [
      "Advanced charts",
      "Trading tools",
      "API access",
      "Institutional data",
    ],
    category: "Web Platform",
    rating: 4.9,
    downloads: "1M+",
    platforms: ["Web", "Desktop"],
  },
  {
    id: "api",
    name: "CoinGecko API",
    description:
      "Comprehensive cryptocurrency data API for developers and businesses",
    icon: Database,
    features: [
      "Market data",
      "Historical prices",
      "Exchange info",
      "Developer tools",
    ],
    category: "API",
    rating: 4.7,
    downloads: "100K+",
    platforms: ["REST API", "WebSocket"],
  },
  {
    id: "defi-portfolio",
    name: "DeFi Portfolio Tracker",
    description:
      "Track your DeFi investments across multiple protocols and chains",
    icon: BarChart3,
    features: [
      "Multi-chain support",
      "Yield farming",
      "LP tracking",
      "Impermanent loss",
    ],
    category: "DeFi",
    rating: 4.6,
    downloads: "500K+",
    platforms: ["Web", "Mobile"],
  },
  {
    id: "premium",
    name: "CoinGecko Premium",
    description:
      "Advanced features and ad-free experience for serious crypto enthusiasts",
    icon: Shield,
    features: [
      "Ad-free",
      "Premium data",
      "Advanced charts",
      "Priority support",
    ],
    category: "Subscription",
    rating: 4.9,
    downloads: "50K+",
    platforms: ["All Platforms"],
  },
  {
    id: "research",
    name: "CoinGecko Research",
    description:
      "In-depth crypto research reports and market analysis from our expert team",
    icon: Globe,
    features: [
      "Market reports",
      "Trend analysis",
      "Token research",
      "Institutional insights",
    ],
    category: "Research",
    rating: 4.8,
    downloads: "25K+",
    platforms: ["Web", "PDF"],
  },
];

const categories = [
  "Tất cả",
  "Mobile",
  "Web Platform",
  "API",
  "DeFi",
  "Subscription",
  "Research",
];

export default function ProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header
        variant="simplified"
        isMobileMenuOpen={sidebarOpen}
        setIsMobileMenuOpen={setSidebarOpen}
      />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0">
          <div className="container mx-auto px-4 py-5">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4"> Sản phẩm của CoinGecko</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Khám phá bộ công cụ và dịch vụ tiền mã hóa toàn diện của chúng tôi, được thiết kế để giúp bạn tự tin điều hướng thị trường crypto.
                </p>
              </div>
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    size="sm"
                    className={
                      category === "All"
                        ? "bg-coingecko-green-500 hover:bg-coingecko-green-600"
                        : ""
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                  const IconComponent = product.icon;
                  return (
                    <Card
                      key={product.id}
                      className="group hover:shadow-lg transition-shadow duration-300"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-coingecko-green-100 dark:bg-coingecko-green-900">
                              <IconComponent className="h-6 w-6 text-coingecko-green-600 dark:text-coingecko-green-400" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {product.name}
                              </CardTitle>
                              <Badge variant="secondary" className="text-xs">
                                {product.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          {product.description}
                        </p>

                        {/* Rating and Downloads */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">
                              {product.rating}
                            </span>
                          </div>
                          <span className="text-muted-foreground">
                            {product.downloads} users
                          </span>
                        </div>

                        {/* Features */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Các tính năng chính:</h4>
                          <ul className="space-y-1">
                            {product.features.slice(0, 3).map((feature) => (
                              <li
                                key={feature}
                                className="text-sm text-muted-foreground flex items-center"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-coingecko-green-500 mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Platforms */}
                        <div className="flex flex-wrap gap-1">
                          {product.platforms.map((platform) => (
                            <Badge
                              key={platform}
                              variant="outline"
                              className="text-xs"
                            >
                              {platform}
                            </Badge>
                          ))}
                        </div>

                        {/* Action Button */}
                        <Button className="w-full group-hover:bg-coingecko-green-600 bg-coingecko-green-500">
                          Tìm hiểu thêm
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              {/* CTA Section */}
              <div className="bg-gradient-to-r from-coingecko-green-50 to-blue-50 dark:from-coingecko-green-950 dark:to-blue-950 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Bạn đã sẵn sàng bắt đầu chưa?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Tham gia cùng hàng triệu người dùng đã tin tưởng CoinGecko cho nhu cầu dữ liệu và phân tích tiền mã hóa của họ.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-coingecko-green-500 hover:bg-coingecko-green-600"
                  >
                    Bắt đầu Miễn phí
                  </Button>
                  <Button size="lg" variant="outline">
                    Liên hệ Bộ phận Kinh doanh
                  </Button>
                </div>{" "}
              </div>{" "}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
