import { PortfolioPageClient } from "@/src/components/client/PortfolioPageClient";

// Mock portfolio data
const mockPortfolio = {
  id: "default-portfolio",
  name: "My Portfolio",
  totalValue: 33553.575,
  totalCost: 31000,
  totalPnL: 2553.575,
  totalPnLPercentage: 8.24,
  dayChange: 680.23,
  dayChangePercentage: 2.07,
  weekChange: -234.56,
  weekChangePercentage: -0.69,
  monthChange: 1234.67,
  monthChangePercentage: 3.82,
  allTimeHigh: 35000,
  allTimeLow: 28000,
  volatility: 12.5,
  sharpeRatio: 1.2,
};

// Mock holdings
const mockHoldings = [
  {
    coinId: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    amount: 0.5,
    value: 15000,
    price: 30000, // giả định giá hiện tại
    cost: 14000,
    pnl: 1000,
    pnlPercentage: 7.14,
    averagePrice: 28000,
    currentPrice: 30000,
    allocation: 44.73, // giả định: value / total portfolio value * 100
    priceChange24h: 500,
    priceChangePercentage24h: 1.69,
  },
  {
    coinId: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    amount: 2,
    value: 6000,
    price: 3000,
    cost: 5500,
    pnl: 500,
    pnlPercentage: 9.09,
    averagePrice: 2750,
    currentPrice: 3000,
    allocation: 17.88,
    priceChange24h: 150,
    priceChangePercentage24h: 2.56,
  },
];
// Mock performance data (array of daily snapshots)
const mockPerformanceData = [
  {
    timestamp: 1695686400000, // 26/09/2023
    totalValue: 32000,
    totalCost: 30000,
    pnl: 2000,
    pnlPercentage: 6.67,
  },
  {
    timestamp: 1695772800000, // 27/09/2023
    totalValue: 32500,
    totalCost: 30500,
    pnl: 2000,
    pnlPercentage: 6.56,
  },
  {
    timestamp: 1695859200000, // 28/09/2023
    totalValue: 33553.575,
    totalCost: 31000,
    pnl: 2553.575,
    pnlPercentage: 8.24,
  },
];

// Extracted metrics from mockPortfolio
const mockMetrics = {
  totalValue: mockPortfolio.totalValue,
  totalCost: mockPortfolio.totalCost,
  totalPnL: mockPortfolio.totalPnL,
  totalPnLPercentage: mockPortfolio.totalPnLPercentage,
  dayChange: mockPortfolio.dayChange,
  dayChangePercentage: mockPortfolio.dayChangePercentage,
  weekChange: mockPortfolio.weekChange,
  weekChangePercentage: mockPortfolio.weekChangePercentage,
  monthChange: mockPortfolio.monthChange,
  monthChangePercentage: mockPortfolio.monthChangePercentage,
  allTimeHigh: mockPortfolio.allTimeHigh,
  allTimeLow: mockPortfolio.allTimeLow,
  volatility: mockPortfolio.volatility,
  sharpeRatio: mockPortfolio.sharpeRatio,
};

export default function PortfolioPage() {
  return (
    <PortfolioPageClient
      portfolio={mockPortfolio}
      holdings={mockHoldings}
      performanceData={mockPerformanceData}
      metrics={mockMetrics}
    />
  );
}

