"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";

import { Image as ImageIcon, Users, Star } from "lucide-react";
import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

interface NFTCollection {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  floorPrice: number;
  floorPriceChange24h: number;
  volume24h: number;
  volumeChange24h: number;
  totalSupply: number;
  holders: number;
  listedCount: number;
  listedPercentage: number;
  createdDate: string;
  verified: boolean;
  marketplace: string[];
  traits: number;
}

interface TrendingNFT {
  id: string;
  name: string;
  image: string;
  collectionName: string;
  price: number;
  priceChange24h: number;
  rank: number;
}

// Mock NFT data
const mockCollections: NFTCollection[] = [
  {
    id: "bored-ape-yacht-club",
    name: "Bored Ape Yacht Club",
    slug: "boredapeyachtclub",
    image: "/api/placeholder/100/100",
    description:
      "A collection of 10,000 unique Bored Ape NFTs living on the Ethereum blockchain.",
    floorPrice: 15.5,
    floorPriceChange24h: -2.3,
    volume24h: 892.4,
    volumeChange24h: 12.8,
    totalSupply: 10000,
    holders: 5643,
    listedCount: 1234,
    listedPercentage: 12.34,
    createdDate: "2021-04-30",
    verified: true,
    marketplace: ["OpenSea", "LooksRare", "X2Y2"],
    traits: 170,
  },
  {
    id: "cryptopunks",
    name: "CryptoPunks",
    slug: "cryptopunks",
    image: "/api/placeholder/100/100",
    description:
      "10,000 unique collectible characters with proof of ownership stored on the Ethereum blockchain.",
    floorPrice: 45.2,
    floorPriceChange24h: 5.7,
    volume24h: 1245.8,
    volumeChange24h: -8.2,
    totalSupply: 10000,
    holders: 3482,
    listedCount: 234,
    listedPercentage: 2.34,
    createdDate: "2017-06-23",
    verified: true,
    marketplace: ["OpenSea", "LooksRare"],
    traits: 87,
  },
  {
    id: "azuki",
    name: "Azuki",
    slug: "azuki",
    image: "/api/placeholder/100/100",
    description:
      "A collection of 10,000 avatars that give you membership access to The Garden.",
    floorPrice: 8.9,
    floorPriceChange24h: 1.2,
    volume24h: 567.3,
    volumeChange24h: 23.4,
    totalSupply: 10000,
    holders: 4892,
    listedCount: 789,
    listedPercentage: 7.89,
    createdDate: "2022-01-12",
    verified: true,
    marketplace: ["OpenSea", "Blur"],
    traits: 145,
  },
];

const mockTrending: TrendingNFT[] = [
  {
    id: "1",
    name: "Bored Ape #1234",
    image: "/api/placeholder/80/80",
    collectionName: "Bored Ape Yacht Club",
    price: 18.5,
    priceChange24h: 12.3,
    rank: 1,
  },
  {
    id: "2",
    name: "CryptoPunk #5678",
    image: "/api/placeholder/80/80",
    collectionName: "CryptoPunks",
    price: 52.1,
    priceChange24h: -5.2,
    rank: 2,
  },
];

export default function NFTPage() {
  const [collections, setCollections] = useState<NFTCollection[]>([]);
  const [trending, setTrending] = useState<TrendingNFT[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<
    NFTCollection[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("volume24h");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCollections(mockCollections);
      setTrending(mockTrending);
      setFilteredCollections(mockCollections);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = collections;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (collection) =>
          collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          collection.slug.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "volume24h":
          return b.volume24h - a.volume24h;
        case "floorPrice":
          return b.floorPrice - a.floorPrice;
        case "holders":
          return b.holders - a.holders;
        case "totalSupply":
          return b.totalSupply - a.totalSupply;
        default:
          return 0;
      }
    });

    setFilteredCollections(filtered);
  }, [collections, searchQuery, sortBy]);

  const formatVolume = (volume: number) => `${volume.toFixed(1)} ETH`;
  const formatNumber = (num: number) => num.toLocaleString();

  const totalVolume = collections.reduce((sum, col) => sum + col.volume24h, 0);
  const totalHolders = collections.reduce((sum, col) => sum + col.holders, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          variant="simplified"
          isMobileMenuOpen={sidebarOpen}
          setIsMobileMenuOpen={setSidebarOpen}
        />
        <div className="container mx-auto px-4">
          <div className="w-full max-w-[1536px] mx-auto flex">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <main className="flex-1 p-5">
              <div className="flex items-center justify-center min-h-[400px]">
                <LoadingSpinner size="lg" />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        variant="simplified"
        isMobileMenuOpen={sidebarOpen}
        setIsMobileMenuOpen={setSidebarOpen}
      />
      <div className="container mx-auto px-4">
        <div className="w-full max-w-[1536px] mx-auto flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />{" "}
          <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold">Bộ sưu tập NFT</h1>
                  <p className="text-muted-foreground">
                    Khám phá và phân tích các bộ sưu tập NFT hàng đầu.
                  </p>
                </div>
              </div>

              {/* Market Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Tổng Khối lượng Giao dịch (trong 24 giờ)
                        </p>
                        <p className="text-2xl font-bold">
                          {formatVolume(totalVolume)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Users className="h-6 w-6 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Tổng Chủ sở hữu
                        </p>
                        <p className="text-2xl font-bold">
                          {formatNumber(totalHolders)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Star className="h-6 w-6 text-purple-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Bộ sưu tập đang hoạt động
                        </p>
                        <p className="text-2xl font-bold">
                          {collections.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Danh sách NFT Collections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections.map((collection) => (
                  <Card key={collection.id}>
                    <CardContent>
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-40 object-cover rounded"
                      />
                      <CardContent>{collection.name}</CardContent>
                      <CardContent>{collection.description}</CardContent>
                    </CardContent>

                    <CardContent>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Floor Price:</span>{" "}
                          {collection.floorPrice} ETH
                        </p>
                        <p>
                          <span className="font-medium">Volume (24h):</span>{" "}
                          {collection.volume24h} ETH
                        </p>
                        <p>
                          <span className="font-medium">Holders:</span>{" "}
                          {collection.holders}
                        </p>
                      </div>
                    </CardContent>

                    <CardContent className="justify-between text-xs text-muted-foreground">
                      <span>Created: {collection.createdDate}</span>
                      <span>{collection.marketplace.join(", ")}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
