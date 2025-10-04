"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, Twitter, Github, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Sản phẩm",
      links: [
        { label: "Thị trường", href: "/markets" },
        { label: "Danh mục đầu tư", href: "/portfolio" },
        { label: "DeFi", href: "/defi" },
        { label: "NFTs", href: "/nft" },
        { label: "Phân tích", href: "/analytics" },
      ],
    },
    {
      title: "Tài nguyên",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Tin tức", href: "/news" },
        { label: "Trung tâm trợ giúp", href: "/help" },
        { label: "Tài liệu API", href: "/api-docs" },
        { label: "Trạng thái hệ thống", href: "/status" },
      ],
    },
    {
      title: "Công ty",
      links: [
        { label: "Giới thiệu", href: "/about" },
        { label: "Tuyển dụng", href: "/careers" },
        { label: "Báo chí", href: "/press" },
        { label: "Liên hệ", href: "/contact" },
      ],
    },
    {
      title: "Pháp lý",
      links: [
        { label: "Chính sách quyền riêng tư", href: "/privacy" },
        { label: "Điều khoản dịch vụ", href: "/terms" },
        { label: "Chính sách Cookie", href: "/cookies" },
        { label: "Miễn trừ trách nhiệm", href: "/disclaimer" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/binance", label: "Twitter" },
    { icon: Github, href: "https://github.com/binance", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/binance",
      label: "LinkedIn",
    },
    {
      icon: FaWhatsapp,
      href: "https://www.binance.com/en",
      label: "EWhatsAppmail",
    },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="w-full max-w-[1536px] mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                CryptoX
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Nền tảng toàn diện của bạn dành cho dữ liệu thị trường tiền mã
              hóa, quản lý danh mục đầu tư và tích hợp Web3. Theo dõi, phân tích
              và tối ưu hóa hành trình crypto của bạn.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button key={social.href} variant="ghost" size="icon" asChild>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} CryptoX. Bản quyền đã được bảo lưu.
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Dữ liệu thị trường do CoinGecko cung cấp</span>
            <span>•</span>
            <span> Cập nhật theo thời gian thực qua WebSocket.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
