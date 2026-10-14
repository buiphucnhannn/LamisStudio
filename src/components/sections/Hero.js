"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Pic from "@/components/ui/Pic";
import SplitText from "@/components/fx/SplitText";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/Icons";

const TICK = 2600; // mỗi 2.6s đổi ảnh ở 1 cột (lần lượt các cột)

/**
 * Hero "bộ ba" (triptych): 3 cột ảnh dọc kín màn hình trên desktop — ảnh dọc gốc gần như không bị cắt.
 * Mobile dùng cột giữa phủ toàn màn hình. Parallax: ảnh trôi chậm hơn trang, chữ mờ dần khi cuộn.
 */
export default function Hero({ hero, ui, exploreHref }) {
  const cols = hero.columns;
  const [idx, setIdx] = useState(cols.map(() => 0));
  const [ready, setReady] = useState(false);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  // Chờ màn chào (Preloader) kéo lên rồi mới chạy hiệu ứng mở màn
  useEffect(() => {
    const on = () => setReady(true);
    const already = document.documentElement.classList.contains("is-ready");
    const fallback = setTimeout(on, already ? 0 : 4000);
    window.addEventListener("lamis:ready", on);
    return () => {
      window.removeEventListener("lamis:ready", on);
      clearTimeout(fallback);
    };
  }, []);
  const anim = (cls) => (ready ? cls : "opacity-0");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (y > vh * 1.2) return;
      if (imgRef.current)
        imgRef.current.style.transform = `translate3d(0, ${(y * 0.28).toFixed(1)}px, 0)`;
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(0, ${(y * 0.12).toFixed(1)}px, 0)`;
        textRef.current.style.opacity = String(Math.max(0, 1 - y / (vh * 0.7)));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Xoay vòng ảnh: mỗi TICK đổi ảnh ở một cột, lần lượt các cột (chỉ chạy sau màn chào)
  useEffect(() => {
    if (!ready) return;
    let tick = 0;
    const t = setInterval(() => {
      tick += 1;
      const col = tick % cols.length;
      setIdx((prev) => prev.map((v, c) => (c === col ? (v + 1) % cols[c].length : v)));
    }, TICK);
    return () => clearInterval(t);
  }, [ready, cols]);

  return (
    <section
      id="top"
      data-nav-theme="dark"
      className="relative h-[var(--screen)] min-h-[640px] w-full overflow-hidden bg-ink"
    >
      <div
        ref={imgRef}
        className="absolute inset-0 bleed-cap grid grid-cols-1 will-change-transform lg:grid-cols-3"
      >
        {cols.map((col, c) => (
          <div
            key={c}
            className={cn(
              "relative h-full overflow-hidden",
              ready ? "hero-panel" : "opacity-0",
              c !== 1 && "hidden lg:block",
            )}
            style={{ animationDelay: `${c * 120}ms` }}
          >
            {col.map((s, i) => (
              <div
                key={s.src}
                className={cn(
                  "absolute inset-0 transition-opacity duration-[1500ms] ease-out",
                  i === idx[c] ? "opacity-100" : "opacity-0",
                )}
                aria-hidden={i !== idx[c]}
              >
                <Pic
                  src={s.src}
                  alt=""
                  fill
                  preload={i === 0}
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className={cn("object-cover", i === idx[c] && "animate-kenburns")}
                  style={{ objectPosition: s.pos }}
                />
              </div>
            ))}
            {c > 0 && (
              <span className="absolute inset-y-0 left-0 hidden w-px bg-white/15 lg:block" />
            )}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />

      <div
        ref={textRef}
        className="relative z-10 flex h-full flex-col items-center justify-end px-5 pb-24 text-center text-white will-change-transform sm:pb-[max(7rem,calc(var(--screen)*0.12))] [@media(min-height:1000px)]:pb-[calc(var(--screen)*0.2)]"
      >
        <p
          className={cn(
            "mb-5 eyebrow text-white/95 text-legible",
            anim("[animation:fadeUp_1s_.8s_both]"),
          )}
        >
          {/* mobile: chỉ "Lamis Studio · TP. Vinh" trên 1 dòng (ẩn phần giữa — địa chỉ); từ sm hiện đủ */}
          {hero.eyebrow.split(" · ").map((part, i, arr) => (
            <span key={part} className={cn(i > 0 && i < arr.length - 1 && "hidden sm:inline")}>
              {i > 0 && " · "}
              {part}
            </span>
          ))}
        </p>
        <SplitText
          as="h1"
          mode="char"
          text={hero.title}
          accent={hero.accent}
          accentClass="italic text-[#f3ece3]"
          visible={ready}
          manual
          step={22}
          baseDelay={950}
          breakBeforeAccent
          className="max-w-5xl h-display text-[2.15rem] leading-[1.05] text-white text-legible-lg min-[380px]:text-[2.4rem] sm:text-[4.2rem] sm:leading-[1.02] lg:text-[5.2rem] xl:text-[6rem]"
        />
        <p
          className={cn(
            "mt-6 max-w-xl text-[15px] leading-relaxed font-medium text-white text-legible sm:text-base",
            anim("[animation:fadeUp_1s_1.7s_both]"),
          )}
        >
          {hero.desc}
        </p>
        <div
          className={cn(
            // mobile: 2 nút xếp dọc, rộng & cao bằng nhau; từ sm nằm ngang như cũ
            "mt-8 flex w-full max-w-[290px] flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center",
            anim("[animation:fadeUp_1s_1.95s_both]"),
          )}
        >
          <Link
            href={exploreHref}
            className="group relative inline-flex h-12 items-center justify-center rounded-full bg-white px-14 text-sm font-medium text-ink transition hover:bg-fog-100 sm:h-auto sm:justify-start sm:gap-3 sm:py-1.5 sm:pr-1.5 sm:pl-6"
          >
            {ui.explore}
            {/* mobile: chữ căn giữa nút, vòng mũi tên neo mép phải; từ sm nằm cạnh chữ như cũ */}
            <span className="absolute right-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:translate-x-0.5 sm:static">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <button
            type="button"
            data-booking
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/60 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition text-legible hover:bg-white hover:text-ink hover:[text-shadow:none] sm:h-auto sm:py-3"
          >
            {ui.book}
          </button>
        </div>
      </div>

      <ul
        className={cn(
          "absolute inset-x-0 bottom-6 z-10 hidden items-center justify-center gap-6 text-[11px] tracking-[0.25em] text-white/90 uppercase text-legible lg:flex",
          anim("[animation:fadeUp_1s_2.2s_both]"),
        )}
      >
        {hero.badges.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-accent-light" />
            {b}
          </li>
        ))}
      </ul>
    </section>
  );
}
