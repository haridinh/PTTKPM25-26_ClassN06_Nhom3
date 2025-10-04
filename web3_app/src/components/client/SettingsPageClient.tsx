"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import {
  User,
  Bell,
  Palette,
  Shield,
  Database,
  LogOut,
  Save,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const currencies = [
  { value: "USD", label: "US Dollar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "GBP", label: "British Pound (GBP)" },
  { value: "JPY", label: "Japanese Yen (JPY)" },
  { value: "BTC", label: "Bitcoin (BTC)" },
  { value: "ETH", label: "Ethereum (ETH)" },
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
];

const refreshIntervals = [
  { value: 5, label: "5 giây" },
  { value: 15, label: "15 giây" },
  { value: 30, label: "30 giây" },
  { value: 60, label: "1 phút" },
  { value: 300, label: "5 phút" },
];

export function SettingsPageClient() {
  const { user, updateProfile, isLoading } = useAuth();
  const { setTheme } = useTheme();
  const [isSaving, setIsSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
  });

  const [preferences, setPreferences] = useState({
    theme: (user?.preferences?.theme || "system") as
      | "light"
      | "dark"
      | "system",
    currency: user?.preferences?.currency || "USD",
    language: user?.preferences?.language || "en",
    notifications: {
      email: user?.preferences?.notifications?.email ?? true,
      push: user?.preferences?.notifications?.push ?? true,
      priceAlerts: user?.preferences?.notifications?.priceAlerts ?? true,
      portfolioUpdates:
        user?.preferences?.notifications?.portfolioUpdates ?? true,
      newsUpdates: user?.preferences?.notifications?.newsUpdates ?? false,
      marketUpdates: user?.preferences?.notifications?.marketUpdates ?? true,
    },
    privacy: {
      showPortfolio: user?.preferences?.privacy?.showPortfolio ?? false,
      showHoldings: user?.preferences?.privacy?.showHoldings ?? false,
      analyticsOptIn: user?.preferences?.privacy?.analyticsOptIn ?? true,
    },
    display: {
      showTestnetData: user?.preferences?.display?.showTestnetData ?? false,
      compactMode: user?.preferences?.display?.compactMode ?? false,
      autoRefresh: user?.preferences?.display?.autoRefresh ?? true,
      refreshInterval: user?.preferences?.display?.refreshInterval ?? 30,
    },
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleProfileUpdate = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        displayName: profileForm.displayName,
        preferences,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Profile update error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setPreferences((prev) => ({
      ...prev,
      theme: newTheme as "light" | "dark" | "system",
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">
              Yêu cầu Xác thực/Đăng nhập
            </h2>
            <p className="text-muted-foreground">
              Vui lòng đăng nhập để truy cập cài đặt của bạn.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Cài đặt</h1>
                <p className="text-muted-foreground">
                  Quản lý cài đặt tài khoản và tùy chọn của bạn.
                </p>
              </div>
              <Button onClick={handleProfileUpdate} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span className="ml-2">Đang lưu...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Lưu Thay đổi
                  </>
                )}
              </Button>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Hồ sơ cá nhân
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="flex items-center gap-2"
                >
                  <Palette className="h-4 w-4" />
                  Giao diện
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="flex items-center gap-2"
                >
                  <Bell className="h-4 w-4" />
                  Thông báo
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Quyền riêng tư
                </TabsTrigger>
                <TabsTrigger
                  value="advanced"
                  className="flex items-center gap-2"
                >
                  <Database className="h-4 w-4" />
                  Nâng cao
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin Hồ sơ</CardTitle>
                    <CardDescription>
                      Cập nhật thông tin cá nhân và chi tiết hồ sơ của bạn.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage
                          src={user.photoURL || ""}
                          alt={user.displayName || ""}
                        />
                        <AvatarFallback>
                          {user.displayName?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Thay đổi Ảnh đại diện
                        </Button>
                        <p className="text-sm text-muted-foreground mt-1">
                          JPG, PNG hoặc GIF. Kích thước tối đa 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Tên hiển thị</Label>
                        <Input
                          id="displayName"
                          value={profileForm.displayName}
                          onChange={(e) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              displayName: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileForm.email}
                          disabled
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Chủ đề</CardTitle>
                    <CardDescription>
                      Chọn chủ đề màu sắc bạn muốn
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {["light", "dark", "system"].map((theme) => (
                        <div
                          key={theme}
                          className={cn(
                            "cursor-pointer rounded-lg border p-4 text-center",
                            preferences.theme === theme && "border-primary"
                          )}
                          onClick={() => handleThemeChange(theme)}
                        >
                          <div className="text-sm font-medium capitalize">
                            {theme}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tùy chọn Hiển thị</CardTitle>
                    <CardDescription>
                      Tùy chỉnh cách thông tin được hiển thị.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Đơn vị tiền tệ cơ sở</Label>
                        <Select
                          value={preferences.currency}
                          onValueChange={(value) =>
                            setPreferences((prev) => ({
                              ...prev,
                              currency: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem
                                key={currency.value}
                                value={currency.value}
                              >
                                {currency.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Ngôn ngữ</Label>
                        <Select
                          value={preferences.language}
                          onValueChange={(value) =>
                            setPreferences((prev) => ({
                              ...prev,
                              language: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {languages.map((language) => (
                              <SelectItem
                                key={language.value}
                                value={language.value}
                              >
                                {language.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tùy chọn Thông báo</CardTitle>
                    <CardDescription>
                      Kiểm soát cách thức và thời điểm bạn nhận thông báo.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Thông báo qua Email</Label>
                          <p className="text-sm text-muted-foreground">
                            Nhận thông báo qua thư điện tử.
                          </p>
                        </div>
                        <Switch
                          checked={preferences.notifications.email}
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                email: checked,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Thông báo Đẩy</Label>
                          <p className="text-sm text-muted-foreground">
                            Nhận thông báo đẩy trong trình duyệt của bạn.
                          </p>
                        </div>
                        <Switch
                          checked={preferences.notifications.push}
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                push: checked,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Cảnh báo Giá</Label>
                          <p className="text-sm text-muted-foreground">
                            Nhận thông báo khi đạt đến các mức giá mục tiêu
                          </p>
                        </div>
                        <Switch
                          checked={preferences.notifications.priceAlerts}
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                priceAlerts: checked,
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cài đặt Quyền riêng tư</CardTitle>
                    <CardDescription>
                      Kiểm soát quyền riêng tư và các tùy chọn chia sẻ dữ liệu
                      của bạn.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Hiển thị Danh mục đầu tư</Label>
                          <p className="text-sm text-muted-foreground">
                            Cho phép người khác xem danh mục đầu tư của bạn.
                          </p>
                        </div>
                        <Switch
                          checked={preferences.privacy.showPortfolio}
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({
                              ...prev,
                              privacy: {
                                ...prev.privacy,
                                showPortfolio: checked,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Bật phân tích</Label>
                          <p className="text-sm text-muted-foreground">
                            Giúp cải thiện dịch vụ bằng cách chia sẻ dữ liệu sử
                            dụng.
                          </p>
                        </div>
                        <Switch
                          checked={preferences.privacy.analyticsOptIn}
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({
                              ...prev,
                              privacy: {
                                ...prev.privacy,
                                analyticsOptIn: checked,
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cài đặt Nâng cao</CardTitle>
                    <CardDescription>
                      Các tùy chọn cấu hình nâng cao
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Tự động Làm mới</Label>
                          <p className="text-sm text-muted-foreground">
                            Tự động làm mới dữ liệu
                          </p>
                        </div>
                        <Switch
                          checked={preferences.display.autoRefresh}
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({
                              ...prev,
                              display: {
                                ...prev.display,
                                autoRefresh: checked,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Khoảng thời gian Làm mới</Label>
                        <Select
                          value={preferences.display.refreshInterval.toString()}
                          onValueChange={(value) =>
                            setPreferences((prev) => ({
                              ...prev,
                              display: {
                                ...prev.display,
                                refreshInterval: parseInt(value),
                              },
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {refreshIntervals.map((interval) => (
                              <SelectItem
                                key={interval.value}
                                value={interval.value.toString()}
                              >
                                {interval.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <div className="text-sm text-destructive">
                        <h4 className="font-medium">Khu vực Nguy hiểm</h4>
                        <p className="text-muted-foreground">
                          Các hành động này không thể hoàn tác
                        </p>
                      </div>
                      <Button variant="destructive" className="w-full">
                        <LogOut className="h-4 w-4 mr-2" />
                        Xóa Tài khoản
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
