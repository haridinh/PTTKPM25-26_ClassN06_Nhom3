"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Check,
  Settings,
  Plus,
  Shield,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Notification {
  id: string;
  type:
    | "price_alert"
    | "news"
    | "portfolio"
    | "system"
    | "watchlist"
    | "security"
    | "social";
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  priority: "low" | "medium" | "high" | "urgent";
  icon: React.ComponentType<{ className?: string }>;
  action?: {
    label: string;
    href: string;
  };
  data?: {
    symbol?: string;
    price?: number;
    change?: number;
    amount?: number;
  };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "price_alert",
    title: "Bitcoin Price Alert",
    description: "BTC has reached your target price of $45,000",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    isRead: false,
    priority: "high",
    icon: TrendingUp,
    action: {
      label: "View Chart",
      href: "/coin/bitcoin",
    },
    data: {
      symbol: "BTC",
      price: 45250,
      change: 3.2,
    },
  },
  {
    id: "2",
    type: "portfolio",
    title: "Portfolio Milestone",
    description: "Congratulations! Your portfolio has reached $50,000",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
    priority: "high",
    icon: DollarSign,
    action: {
      label: "View Portfolio",
      href: "/portfolio",
    },
    data: {
      amount: 50000,
      change: 8.5,
    },
  },
  {
    id: "3",
    type: "security",
    title: "New Device Login",
    description: "A new device has logged into your account from New York, USA",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    isRead: false,
    priority: "urgent",
    icon: Shield,
    action: {
      label: "Review Activity",
      href: "/security",
    },
  },
  {
    id: "4",
    type: "news",
    title: "Major Market News",
    description:
      "SEC approves new cryptocurrency ETF proposals - Market rallying",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: true,
    priority: "medium",
    icon: AlertTriangle,
    action: {
      label: "Read More",
      href: "/news",
    },
  },
  {
    id: "5",
    type: "watchlist",
    title: "Ethereum Price Drop",
    description:
      "ETH has dropped 5% from your watchlist price - consider buying the dip",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    isRead: true,
    priority: "medium",
    icon: TrendingDown,
    action: {
      label: "View Watchlist",
      href: "/watchlist",
    },
    data: {
      symbol: "ETH",
      price: 2850,
      change: -5.2,
    },
  },
  {
    id: "6",
    type: "social",
    title: "Whale Alert",
    description:
      "Large Bitcoin transaction detected: 1,000 BTC moved to unknown wallet",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    isRead: true,
    priority: "medium",
    icon: AlertTriangle,
  },
  {
    id: "7",
    type: "system",
    title: "System Maintenance Complete",
    description:
      "Scheduled maintenance has been completed. All services are now operational",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    isRead: true,
    priority: "low",
    icon: Settings,
  },
  {
    id: "8",
    type: "portfolio",
    title: "Rebalancing Suggestion",
    description:
      "Your portfolio allocation has shifted. Consider rebalancing your holdings",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isRead: true,
    priority: "low",
    icon: DollarSign,
    action: {
      label: "View Suggestions",
      href: "/portfolio/rebalance",
    },
  },
];

export default function NotificationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [newAlertSymbol, setNewAlertSymbol] = useState("");
  const [newAlertPrice, setNewAlertPrice] = useState("");
  const [newAlertType, setNewAlertType] = useState("above");

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const createPriceAlert = () => {
    if (!newAlertSymbol || !newAlertPrice) return;

    const newAlert: Notification = {
      id: Date.now().toString(),
      type: "price_alert",
      title: `New Price Alert Created`,
      description: `Alert set for ${newAlertSymbol.toUpperCase()} ${newAlertType} $${newAlertPrice}`,
      timestamp: new Date(),
      isRead: false,
      priority: "medium",
      icon: Bell,
    };

    setNotifications((prev) => [newAlert, ...prev]);
    setNewAlertSymbol("");
    setNewAlertPrice("");
    setShowCreateAlert(false);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const urgentCount = notifications.filter(
    (n) => !n.isRead && n.priority === "urgent"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <Header
        variant="simplified"
        isMobileMenuOpen={sidebarOpen}
        setIsMobileMenuOpen={setSidebarOpen}
      />
      <div className="flex container mx-auto px-4">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0">
          <div className="container mx-auto px-4 py-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Bell className="h-8 w-8" />
                    Thông báo
                    {unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white">
                        {unreadCount}
                      </Badge>
                    )}
                    {urgentCount > 0 && (
                      <Badge className="bg-red-600 text-white animate-pulse">
                        {urgentCount} Khẩn cấp
                      </Badge>
                    )}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Luôn cập nhật thông tin về danh mục đầu tư crypto và biến
                    động thị trường của bạn.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog
                    open={showCreateAlert}
                    onOpenChange={setShowCreateAlert}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Tạo cảnh báo
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Tạo cảnh báo giá</DialogTitle>
                        <DialogDescription>
                          Nhận thông báo khi một đồng tiền mã hóa đạt đến mức
                          giá mục tiêu của bạn.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="symbol">Ký hiệu Tiền mã hóa</Label>
                          <Input
                            id="symbol"
                            placeholder="e.g., BTC, ETH"
                            value={newAlertSymbol}
                            onChange={(e) => setNewAlertSymbol(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="alertType">Loại cảnh báo</Label>
                          <Select
                            value={newAlertType}
                            onValueChange={setNewAlertType}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="above">
                                Giá vượt lên trên
                              </SelectItem>
                              <SelectItem value="below">
                                Giá giảm xuống dưới
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="price">Giá mục tiêu ($)</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="e.g., 45000"
                            value={newAlertPrice}
                            onChange={(e) => setNewAlertPrice(e.target.value)}
                          />
                        </div>
                        <Button onClick={createPriceAlert} className="w-full">
                          Tạo cảnh báo
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Đánh dấu Tất cả đã đọc
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
