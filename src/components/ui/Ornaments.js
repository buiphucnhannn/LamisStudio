import { cn } from "@/lib/utils";

/**
 * Hoạ tiết line-art tối giản theo chủ đề studio ảnh & makeup: máy ảnh, ống kính (khẩu độ),
 * dù phản quang, cọ trang điểm, thỏi son, ngôi sao lấp lánh. Nét mảnh, dùng `currentColor` → chỉnh màu/độ mờ bằng class
 * text-* (thường text-ink/15). Luôn là trang trí: aria-hidden + pointer-events-none.
 *
 * Dùng: <Ornament name="camera" className="absolute right-10 top-20 w-24 text-ink/15" float />
 */
const shapes = {
  camera: (
    <>
      <rect x="10" y="30" width="80" height="52" rx="8" />
      <path d="M34 30l6-10h20l6 10" />
      <circle cx="50" cy="56" r="15" />
      <circle cx="50" cy="56" r="8" />
      <path d="M74 40h6" />
      <path d="M18 24h8" />
    </>
  ),
  aperture: (
    <>
      <circle cx="50" cy="50" r="38" />
      <circle cx="50" cy="50" r="14" />
      <path d="M50 12L62 37M88 50L63 45M69 83L58 61M31 83L40 62M12 50L36 46M31 17L42 38M69 17L61 40" />
    </>
  ),
  lipstick: (
    <>
      <path d="M38 50h24v42H38z" />
      <path d="M34 50h32M42 50V32l16-14v32" />
      <path d="M44 62h12" />
    </>
  ),
  brush: (
    <>
      <path d="M46 92V52h8v40" />
      <path d="M44 52c-8-10-8-28 6-42 14 14 14 32 6 42z" />
      <path d="M50 14v30" />
    </>
  ),
  fan: (
    <>
      <path d="M50 84L12 46a54 54 0 0 1 76 0z" />
      <path d="M50 84L24 36M50 84L37 30M50 84V28M50 84L63 30M50 84L76 36" />
      <path d="M22 50a40 40 0 0 1 56 0" />
      <circle cx="50" cy="84" r="3" />
      <path d="M50 87c0 6-4 9-8 10" />
    </>
  ),
  umbrella: (
    <>
      <path d="M8 46a42 22 0 0 1 84 0" />
      <path d="M8 46q10-6 21 0t21 0 21 0 21 0" />
      <path d="M50 24v-6" />
      <path d="M29 46L50 24M71 46L50 24M50 46V24" />
      <path d="M50 46v36a6 6 0 0 1-12 0" />
    </>
  ),
  hanger: (
    <>
      <path d="M50 34v-6a8 8 0 1 1 8-8" />
      <path d="M50 34L10 66a4 4 0 0 0 3 7h74a4 4 0 0 0 3-7z" />
    </>
  ),
  lantern: (
    <>
      <path d="M50 6v10" />
      <path d="M38 16h24M38 84h24" />
      <ellipse cx="50" cy="50" rx="28" ry="34" />
      <path d="M50 16c-12 10-12 58 0 68M50 16c12 10 12 58 0 68" />
      <path d="M50 84v10M46 94h8" />
    </>
  ),
  sparkle: (
    <>
      <path d="M50 10c3 24 16 37 40 40-24 3-37 16-40 40-3-24-16-37-40-40 24-3 37-16 40-40z" />
    </>
  ),
};

export default function Ornament({ name, className, float = false, delay = 0 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("pointer-events-none select-none", float && "animate-float", className)}
      style={float && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {shapes[name]}
    </svg>
  );
}

// Chữ ký mờ cỡ lớn (font viết tay) làm watermark nền — vd. <Watermark text="Services" className="absolute ... text-ink/[0.05]" />
export function Watermark({ text, className }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none font-script leading-none whitespace-nowrap select-none",
        className,
      )}
    >
      {text}
    </span>
  );
}
