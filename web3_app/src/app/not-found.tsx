import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="flex flex-col items-center mb-6">
        <TrendingUp className="h-16 w-16 text-coingecko-green-500 mb-4" />
        <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-4 max-w-md">
          Ối! Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.
          Vui lòng kiểm tra lại đường dẫn (URL) hoặc quay về trang chủ.
        </p>
        <Button asChild size="lg" className="mt-2">
          <Link href="/">Đi đến Trang chủ
          </Link>
        </Button>
      </div>
      <div className="w-full max-w-md mx-auto">
        <div className="text-6xl opacity-20">🚀</div>
        <p className="text-sm text-muted-foreground mt-4">
          Có vẻ như trang này đã 'bay lên mặt trăng' rồi!
        </p>
      </div>
    </div>
  );
}
