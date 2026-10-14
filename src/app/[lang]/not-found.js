import Link from "next/link";
import Container from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";

// Trang 404 (song ngữ gọn — không có params trong not-found nên hiển thị cả hai)
export default function NotFound() {
  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <p className="font-serif text-8xl text-ink/15">404</p>
      <h1 className="mt-2 h-display text-3xl sm:text-4xl">Không tìm thấy trang</h1>
      <p className="mt-2 text-sm text-ink-muted">Page not found</p>
      <Link
        href="/"
        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-6 text-sm font-medium text-white transition hover:bg-graphite"
      >
        Về trang chủ · Home
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </Container>
  );
}
