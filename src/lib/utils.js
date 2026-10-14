export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Khoá/mở cuộn toàn trang (popup, lightbox, menu mobile).
// Khoá trên <html> vì html có overflow-x: clip nên overflow của body không truyền lên viewport.
let lockCount = 0;
export function lockScroll(lock) {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount + (lock ? 1 : -1));
  const locked = lockCount > 0;
  const html = document.documentElement;
  if (locked) {
    const sbw = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = sbw + "px";
    window.__lenis?.stop();
  } else {
    html.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    window.__lenis?.start();
  }
}

// Nối 2 từ cuối bằng khoảng trắng không ngắt (U+00A0) → đoạn văn không bao giờ rớt 1 chữ lẻ xuống dòng cuối.
// Dùng cho đoạn hẹp mà text-wrap: pretty không xử lý được (vd. cột mô tả album).
export const noOrphan = (text = "") => text.replace(/ (\S+)$/, "\u00a0$1");
