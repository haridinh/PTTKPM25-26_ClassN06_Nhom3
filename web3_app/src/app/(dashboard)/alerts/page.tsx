"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { SearchBar } from "@/components/common/SearchBar";
import {
  Plus,
  Bell,
  BellOff,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Settings,
  Target,
  Clock,
  MoreHorizontal,
  Mail,
  Smartphone,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

interface PriceAlert {
  id: string;
  coinId: string;
  coinSymbol: string;
  coinName: string;
  condition: "trên" | "dưới";
  targetPrice: number;
  currentPrice: number;
  isActive: boolean;
  isTriggered: boolean;
  notificationMethods: ("email" | "push")[];
  createdAt: string;
  triggeredAt?: string;
  message?: string;
}

interface AlertStats {
  total: number;
  active: number;
  triggered: number;
  disabled: number;
}

// Mock alert data
const mockAlerts: PriceAlert[] = [
  {
    id: "1",
    coinId: "bitcoin",
    coinSymbol: "BTC",
    coinName: "Bitcoin",
    condition: "trên",
    targetPrice: 45000,
    currentPrice: 43250.45,
    isActive: true,
    isTriggered: false,
    notificationMethods: ["email", "push"],
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "2",
    coinId: "ethereum",
    coinSymbol: "ETH",
    coinName: "Ethereum",
    condition: "dưới",
    targetPrice: 2400,
    currentPrice: 2580.75,
    isActive: true,
    isTriggered: false,
    notificationMethods: ["push"],
    createdAt: "2024-01-12T15:30:00Z",
  },
  {
    id: "3",
    coinId: "cardano",
    coinSymbol: "ADA",
    coinName: "Cardano",
    condition: "trên",
    targetPrice: 0.55,
    currentPrice: 0.48,
    isActive: false,
    isTriggered: true,
    notificationMethods: ["email"],
    createdAt: "2024-01-08T09:15:00Z",
    triggeredAt: "2024-01-14T14:22:00Z",
    message: "Cardano đã đạt mức giá mục tiêu của bạn $0.55",
  },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<PriceAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Create alert form state
  const [newAlert, setNewAlert] = useState({
    coinSymbol: "",
    condition: "trên" as "trên" | "dưới",
    targetPrice: "",
    notificationMethods: ["push"] as ("email" | "push")[],
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAlerts(mockAlerts);
      setFilteredAlerts(mockAlerts);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = alerts;

    // Filter by status
    if (filterStatus !== "all") {
      switch (filterStatus) {
        case "active":
          filtered = filtered.filter(
            (alert) => alert.isActive && !alert.isTriggered
          );
          break;
        case "triggered":
          filtered = filtered.filter((alert) => alert.isTriggered);
          break;
        case "disabled":
          filtered = filtered.filter(
            (alert) => !alert.isActive && !alert.isTriggered
          );
          break;
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (alert) =>
          alert.coinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alert.coinSymbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "createdAt":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "targetPrice":
          return b.targetPrice - a.targetPrice;
        case "coinName":
          return a.coinName.localeCompare(b.coinName);
        default:
          return 0;
      }
    });

    setFilteredAlerts(filtered);
  }, [alerts, searchQuery, filterStatus, sortBy]);

  const createAlert = () => {
    if (!newAlert.coinSymbol || !newAlert.targetPrice) return;

    const alert: PriceAlert = {
      id: Date.now().toString(),
      coinId: newAlert.coinSymbol.toLowerCase(),
      coinSymbol: newAlert.coinSymbol.toUpperCase(),
      coinName: newAlert.coinSymbol, // In real app, would lookup coin name
      condition: newAlert.condition,
      targetPrice: parseFloat(newAlert.targetPrice),
      currentPrice: 0, // Would be fetched from API
      isActive: true,
      isTriggered: false,
      notificationMethods: newAlert.notificationMethods,
      createdAt: new Date().toISOString(),
    };

    setAlerts([alert, ...alerts]);
    setNewAlert({
      coinSymbol: "",
      condition: "trên",
      targetPrice: "",
      notificationMethods: ["push"],
    });
    setShowCreateDialog(false);
  };

  const toggleAlert = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const dismissAlert = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id
          ? { ...alert, isTriggered: false, isActive: false }
          : alert
      )
    );
  };

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(6)}`;
    if (price < 10) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  // const getStatusColor = (alert: PriceAlert) => {
  //   if (alert.isTriggered) return "text-green-500";
  //   if (alert.isActive) return "text-blue-500";
  //   return "text-gray-500";
  // };

  const getStatusBadge = (alert: PriceAlert) => {
    if (alert.isTriggered)
      return (
        <Badge className="bg-green-100 text-green-800">Đã Kích hoạt</Badge>
      );
    if (alert.isActive)
      return (
        <Badge className="bg-blue-100 text-blue-800">Đang Hoạt động</Badge>
      );
    return <Badge variant="secondary">Đã Vô hiệu hóa</Badge>;
  };

  const stats: AlertStats = {
    total: alerts.length,
    active: alerts.filter((a) => a.isActive && !a.isTriggered).length,
    triggered: alerts.filter((a) => a.isTriggered).length,
    disabled: alerts.filter((a) => !a.isActive && !a.isTriggered).length,
  };

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
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="container mx-auto p-5 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold">Thông báo giá</h1>
                <p className="text-muted-foreground">
                  Nhận thông báo khi tiền điện tử của bạn đạt đến mức giá mục
                  tiêu
                </p>
              </div>
              <Dialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm thông báo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tạo thông báo mới</DialogTitle>
                    <DialogDescription>
                      Thiết lập cảnh báo giá để nhận thông báo khi một đồng tiền
                      điện tử đạt đến mức giá mục tiêu của bạn
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="coinSymbol">Tiền điện tử</Label>
                      <Input
                        id="coinSymbol"
                        value={newAlert.coinSymbol}
                        onChange={(e) =>
                          setNewAlert({
                            ...newAlert,
                            coinSymbol: e.target.value,
                          })
                        }
                        placeholder="e.g., BTC, ETH, ADA"
                      />
                    </div>
                    <div>
                      <Label htmlFor="condition">Điều kiện Cảnh báo</Label>
                      <Select
                        value={newAlert.condition}
                        onValueChange={(value: "trên" | "dưới") =>
                          setNewAlert({ ...newAlert, condition: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trên">
                            Giá vượt qua (hoặc Giá trên)
                          </SelectItem>
                          <SelectItem value="dưới">
                            Giá xuống dưới (hoặc Giá dưới)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="targetPrice">
                        Mức giá Mục tiêu (USD)
                      </Label>
                      <Input
                        id="targetPrice"
                        type="number"
                        step="0.000001"
                        value={newAlert.targetPrice}
                        onChange={(e) =>
                          setNewAlert({
                            ...newAlert,
                            targetPrice: e.target.value,
                          })
                        }
                        placeholder="Enter target price"
                      />
                    </div>
                    <div>
                      <Label>Phương thức Thông báo</Label>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={newAlert.notificationMethods.includes(
                              "email"
                            )}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                setNewAlert({
                                  ...newAlert,
                                  notificationMethods: [
                                    ...newAlert.notificationMethods,
                                    "email",
                                  ],
                                });
                              } else {
                                setNewAlert({
                                  ...newAlert,
                                  notificationMethods:
                                    newAlert.notificationMethods.filter(
                                      (m) => m !== "email"
                                    ),
                                });
                              }
                            }}
                          />
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={newAlert.notificationMethods.includes(
                              "push"
                            )}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                setNewAlert({
                                  ...newAlert,
                                  notificationMethods: [
                                    ...newAlert.notificationMethods,
                                    "push",
                                  ],
                                });
                              } else {
                                setNewAlert({
                                  ...newAlert,
                                  notificationMethods:
                                    newAlert.notificationMethods.filter(
                                      (m) => m !== "push"
                                    ),
                                });
                              }
                            }}
                          />
                          <Smartphone className="h-4 w-4" />
                          <span>Push</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={createAlert} className="flex-1">
                        Tạo
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowCreateDialog(false)}
                        className="flex-1"
                      >
                        Hủy
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Tổng Thông báo
                      </p>
                      <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Target className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Đang Hoạt động
                      </p>
                      <p className="text-2xl font-bold">{stats.active}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-purple-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Đã Kích hoạt
                      </p>
                      <p className="text-2xl font-bold">{stats.triggered}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <BellOff className="h-6 w-6 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Đã Vô hiệu hóa
                      </p>
                      <p className="text-2xl font-bold">{stats.disabled}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar
                    placeholder="Search alerts..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="all">Tất cả Trạng thái</option>
                    <option value="active">Đang Hoạt động</option>
                    <option value="triggered">Đã Kích hoạt</option>
                    <option value="disabled">Đã Vô hiệu hóa</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="createdAt">Mới nhất Trước</option>
                    <option value="targetPrice">Mức giá Mục tiêu</option>
                    <option value="coinName">Tên Đồng coin</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Alerts List */}
            {filteredAlerts.length > 0 ? (
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <Card
                    key={alert.id}
                    className={`transition-shadow hover:shadow-md ${
                      alert.isTriggered ? "border-green-200 " : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {alert.coinSymbol.slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">
                                {alert.coinName}
                              </h3>
                              <span className="text-muted-foreground">
                                ({alert.coinSymbol})
                              </span>
                              {getStatusBadge(alert)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Cảnh báo khi giá {alert.condition}{" "}
                              {formatPrice(alert.targetPrice)}
                            </p>
                            {alert.isTriggered && alert.message && (
                              <p className="text-sm text-green-600 mt-1">
                                {alert.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-semibold">
                              Mục tiêu: {formatPrice(alert.targetPrice)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Hiện tại: {formatPrice(alert.currentPrice)}
                            </p>
                            <div className="flex items-center space-x-1 mt-1">
                              {alert.notificationMethods.map((method) => (
                                <div key={method} className="flex items-center">
                                  {method === "email" ? (
                                    <Mail className="h-3 w-3 text-blue-500" />
                                  ) : (
                                    <Smartphone className="h-3 w-3 text-green-500" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={alert.isActive}
                              onCheckedChange={() => toggleAlert(alert.id)}
                              disabled={alert.isTriggered}
                            />

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Settings className="mr-2 h-4 w-4" />
                                  Chỉnh sửa Thông báo
                                </DropdownMenuItem>
                                {alert.isTriggered && (
                                  <DropdownMenuItem
                                    onClick={() => dismissAlert(alert.id)}
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Bỏ qua
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={() => deleteAlert(alert.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Xóa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3" />
                          <span>
                            Thời gian Tạo: {formatDate(alert.createdAt)}
                          </span>
                        </div>
                        {alert.triggeredAt && (
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-3 w-3 text-green-500" />
                            <span>
                              Thời gian Kích hoạt:{" "}
                              {formatDate(alert.triggeredAt)}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Không tìm thấy thông báo nào
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || filterStatus !== "all"
                      ? "No alerts match your current filters"
                      : "Create your first price alert to get started"}
                  </p>
                  {!searchQuery && filterStatus === "all" && (
                    <Button onClick={() => setShowCreateDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Tạo thông báo
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
