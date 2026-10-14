"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import Lightbox from "@/components/ui/Lightbox";
import useScrollProgress from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";
import { ArrowRight } from "@/components/ui/Icons";
import Ornament from "@/components/ui/Ornaments";

/**
 * Khoảnh khắc — 3 biến thể, cùng một bộ ảnh:
 * 1. Desktop, viewport ≤ 1080px (.pin-only): section ghim, dải ảnh chạy NGANG theo chiều cuộn dọc.
 * 2. Desktop cao hơn 1080px (.stack-only): cùng bố cục nhưng không ghim — kéo chuột để lướt.
 * 3. Mobile (<1024px): tiêu đề trên, dải vuốt ngang bên dưới.
 */
export default function Moments({ moments, ui, allHref, collectionsCount }) {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const scrollerRef = useRef(null);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });
  const [max, setMax] = useState(0);
  const [idx, setIdx] = useState(null);
  const p = useScrollProgress(ref);
  const images = moments.items.map((m) => ({ src: m.src, alt: m.caption }));

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (!t) return;
      setMax(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 600);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { on: true, x: e.clientX, left: el.scrollLeft, moved: false };
    el.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.on) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    scrollerRef.current.scrollLeft = d.left - dx;
  };
  const endDrag = (e) => {
    const d = drag.current;
    if (!d.on) return;
    d.on = false;
    try {
      scrollerRef.current?.releasePointerCapture?.(e.pointerId);
    } catch {}
    setTimeout(() => (drag.current.moved = false), 0);
  };

  const sizeCls = (s) =>
    s === "tall"
      ? "h-[calc(var(--screen)*0.62)] aspect-[2/3]"
      : "h-[calc(var(--screen)*0.44)] aspect-square";

  // Gọi như hàm (không phải component) để dải không remount khi cuộn
  const cardEl = (m, i) => (
    <button
      key={m.src}
      onClick={() => {
        if (drag.current.moved) return;
        setIdx(i);
      }}
      className={cn(
        "group relative shrink-0 overflow-hidden rounded-[1.5rem] bg-fog-200 shadow-card",
        sizeCls(m.size),
        i % 3 === 1 ? "translate-y-10" : i % 3 === 2 ? "-translate-y-8" : "",
      )}
      aria-label={m.caption}
    >
      <Pic
        src={m.src}
        alt={m.caption}
        fill
        sizes="34vw"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/70 to-transparent p-4 text-left text-xs text-white transition-transform duration-500 group-hover:translate-y-0">
        {m.caption}
      </span>
    </button>
  );

  const introEl = (widthCls = "w-[30vw] max-w-[560px]") => (
    <div className={cn("relative shrink-0 pr-10", widthCls)}>
      <Ornament name="umbrella" float className="absolute -top-36 right-20 w-24 text-ink/[0.13]" />
      <p className="reveal eyebrow">{moments.eyebrow}</p>
      <h2
        className="reveal mt-4 h-display text-[3rem] xl:text-[3.6rem]"
        style={{ "--reveal-delay": "100ms" }}
      >
        {moments.title}
      </h2>
      <p
        className="reveal mt-5 max-w-sm text-justify text-sm text-ink-soft"
        style={{ "--reveal-delay": "200ms" }}
      >
        {moments.hint}
      </p>
      <div
        className="reveal mt-6 flex items-center gap-3 text-[11px] tracking-[0.3em] text-ink-muted uppercase"
        style={{ "--reveal-delay": "300ms" }}
      >
        {ui.scroll} <span className="block h-px w-16 bg-ink/20" />{" "}
        <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );
  const endCardEl = () => (
    <Link
      href={allHref}
      className="group flex h-[calc(var(--screen)*0.44)] w-[24vw] max-w-[340px] shrink-0 flex-col items-center justify-center rounded-[1.5rem] border border-ink/10 bg-fog-100 text-center transition hover:bg-ink hover:text-white"
    >
      <p className="font-serif text-3xl">{ui.viewAll}</p>
      <p className="mt-1 text-xs opacity-70">
        {collectionsCount} {ui.collections.toLowerCase()}
      </p>
      <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-current">
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );

  return (
    <div id="moments">
      {/* 1. Desktop ghim */}
      <section ref={ref} className="pin-only relative h-[calc(var(--screen)*3.2)] bg-fog">
        <div className="sticky top-0 flex h-[var(--screen)] items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-center gap-6 pr-10 pl-10 will-change-transform"
            style={{ transform: `translate3d(${(-p * max).toFixed(1)}px,0,0)` }}
          >
            {introEl()}
            {moments.items.map((m, i) => cardEl(m, i))}
            {endCardEl()}
          </div>
        </div>
      </section>

      {/* 2. Desktop không ghim (viewport cao) */}
      <section className="stack-only hidden screen items-center bg-fog py-16 lg:flex">
        <Container wide>
          <div
            ref={scrollerRef}
            className="no-scrollbar w-full cursor-grab overflow-x-auto select-none active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
          >
            <div className="mx-auto flex w-max items-center gap-6 py-12">
              {introEl("w-[26vw] max-w-[460px]")}
              {moments.items.map((m, i) => cardEl(m, i))}
              {endCardEl()}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Mobile */}
      <section className="bg-fog py-16 lg:hidden">
        <div className="px-5">
          <p className="reveal eyebrow">{moments.eyebrow}</p>
          <h2 className="reveal mt-3 h-display text-[2.1rem]" style={{ "--reveal-delay": "100ms" }}>
            {moments.title}
          </h2>
        </div>
        <p className="mt-3 px-5 text-[11px] tracking-[0.25em] text-ink-muted uppercase">
          {ui.swipe}
        </p>
        <div className="mt-5 no-scrollbar flex snap-x gap-4 overflow-x-auto px-5">
          {moments.items.map((m, i) => (
            <button
              key={m.src}
              onClick={() => setIdx(i)}
              className={cn(
                "relative h-[calc(var(--screen)*0.52)] shrink-0 snap-center overflow-hidden rounded-2xl bg-fog-200",
                m.size === "tall" ? "aspect-[2/3]" : "aspect-[4/5]",
              )}
              aria-label={m.caption}
            >
              <Pic src={m.src} alt={m.caption} fill sizes="70vw" className="object-cover" />
            </button>
          ))}
        </div>
        <div className="mt-6 px-5">
          <Link
            href={allHref}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-ink hover:text-white"
          >
            {ui.viewAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Lightbox images={images} index={idx} onClose={() => setIdx(null)} onChange={setIdx} />
    </div>
  );
}
