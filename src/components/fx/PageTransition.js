"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Chuyển trang mượt (không chớp trắng):
 * - Bấm link nội bộ sang trang KHÁC: nội dung hiện tại mờ dần + trôi nhẹ lên (~0.2s) rồi mới điều hướng;
 *   trang mới hiện lên từ dưới (class .page-enter trên <main>, CSS trong globals.css).
 * - Link cùng trang có #section: để SmoothScroll cuộn êm. Link cùng trang không # (logo…): cuộn êm lên đầu.
 * - Link #section sang trang khác (vd. "/#about" từ trang Dịch vụ): chuyển trang mượt, SmoothScroll cuộn tới section.
 * - Bỏ qua: tab mới, tải file, mailto/tel, link ngoài, link đổi ngôn ngữ (hreflang — cố ý tải lại trang).
 * Đăng ký ở pha CAPTURE để chạy trước handler của <Link> (Next bỏ qua điều hướng khi đã preventDefault).
 */
const LEAVE_MS = 160; // điều hướng ngay khi nội dung đang mờ (không chờ mờ hẳn) → chuyển nhanh, không khựng
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  // Trang mới: hiệu ứng vào
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    main.classList.remove("page-leave");
    main.classList.add("page-enter");
    const t = setTimeout(() => main.classList.remove("page-enter"), 500);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    let safety;
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a = e.target.closest("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.hasAttribute("hreflang"))
        return;
      const raw = a.getAttribute("href");
      if (!raw || /^(https?:|mailto:|tel:)/.test(raw)) return;
      const url = new URL(raw, window.location.href);
      if (url.origin !== window.location.origin) return;

      if (url.pathname === window.location.pathname) {
        if (url.hash) return; // SmoothScroll xử lý
        e.preventDefault();
        if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.8, easing: easeOutExpo });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        if (window.location.hash) history.replaceState(null, "", url.pathname);
        return;
      }

      e.preventDefault();
      const main = document.querySelector("main");
      main?.classList.add("page-leave");
      try {
        router.prefetch(url.pathname); // trang mới sẵn sàng khi hiệu ứng rời kết thúc
      } catch {}
      setTimeout(
        () => router.push(url.pathname + url.search + url.hash, { scroll: false }),
        LEAVE_MS,
      );
      // phòng khi điều hướng lỗi/chậm bất thường: không để nội dung ẩn mãi
      clearTimeout(safety);
      safety = setTimeout(() => main?.classList.remove("page-leave"), 4000);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimeout(safety);
    };
  }, [router]);

  return null;
}
