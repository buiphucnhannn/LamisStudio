"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import Lightbox from "@/components/ui/Lightbox";
import { ArrowRight } from "@/components/ui/Icons";

// Marquee dịch track -50% → một vòng (nửa track) phải dài hơn khung tối đa 1920px, không thì hở mép.
// Poster rộng 196px + gap 16px = 212px → lặp danh sách tới khi ≥ 1920px.
const fill = (items) => {
  const out = [...items];
  while (out.length * 212 < 1920) out.push(...items);
  return out;
};

/**
 * Makeup & đào tạo trang điểm: nền tối, 2 dải poster chạy ngược chiều, bấm để phóng to.
 */
export default function Seasonal({ seasonal, ui, collectionSlug }) {
  const [idx, setIdx] = useState(null);
  const images = seasonal.posters.map((src) => ({ src, alt: "" }));
  const half = Math.ceil(images.length / 2);
  const rows = [images.slice(0, half), images.slice(half)];

  const strip = (items, reverse, offset) => (
    <div className="marquee overflow-hidden">
      <div
        className={`marquee-track gap-4 ${reverse ? "reverse" : ""}`}
        style={{ "--marquee-duration": reverse ? "80s" : "70s" }}
      >
        {[...fill(items), ...fill(items)].map((img, i) => (
          <button
            key={i}
            onClick={() => setIdx(offset + (i % items.length))}
            className="group relative h-[200px] w-[150px] shrink-0 overflow-hidden rounded-2xl bg-white/5 sm:h-[260px] sm:w-[196px]"
            aria-label={`${ui.photos} ${offset + (i % items.length) + 1}`}
          >
            <Pic
              src={img.src}
              alt=""
              fill
              sizes="200px"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-ink py-16 text-white lg:py-24"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[160px]" />
      <Container wide className="relative">
        <p className="reveal eyebrow text-accent-light">{seasonal.eyebrow}</p>
        {/* Tiêu đề và nút chung một hàng, căn giữa theo chiều cao → tâm nút ngang tâm tiêu đề */}
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2
            className="reveal max-w-2xl h-display text-[2.2rem] text-white sm:text-[2.8rem] lg:text-[3.3rem]"
            style={{ "--reveal-delay": "80ms" }}
          >
            {seasonal.title}
          </h2>
          <button
            type="button"
            data-booking={collectionSlug}
            className="reveal group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-white py-1.5 pr-1.5 pl-6 text-sm font-medium text-ink transition hover:bg-fog-100 md:self-auto"
            style={{ "--reveal-delay": "240ms" }}
          >
            {seasonal.cta}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>
        <p
          className="reveal mt-5 max-w-xl text-justify text-[15px] leading-relaxed text-white/75"
          style={{ "--reveal-delay": "160ms" }}
        >
          {seasonal.desc}
        </p>
      </Container>

      <div className="reveal bleed-cap mt-12 space-y-4" style={{ "--reveal-delay": "300ms" }}>
        {strip(rows[0], false, 0)}
        {strip(rows[1], true, half)}
      </div>

      <Lightbox images={images} index={idx} onClose={() => setIdx(null)} onChange={setIdx} />
    </section>
  );
}
