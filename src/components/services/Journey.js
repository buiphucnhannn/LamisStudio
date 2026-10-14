"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SplitText from "@/components/fx/SplitText";
import { cn } from "@/lib/utils";

/**
 * Hành trình 4 bước (nền tối): desktop là 4 cột ảnh, bước đang chọn nở rộng và hiện mô tả
 * (rê chuột / chạm để đổi). Mobile: danh sách dọc có đường nối và số thứ tự.
 */
export default function Journey({ journey }) {
  const [active, setActive] = useState(0);

  return (
    <section
      data-nav-theme="dark"
      className="relative flex screen items-center overflow-hidden bg-ink py-16 text-white"
    >
      <div className="pointer-events-none absolute top-1/3 -left-32 h-[480px] w-[480px] rounded-full bg-accent/25 blur-[150px]" />
      <Container wide className="relative">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="reveal eyebrow text-accent-light">{journey.eyebrow}</p>
            <SplitText
              text={journey.title}
              className="mt-4 h-display text-[2.2rem] text-white sm:text-[2.8rem] lg:text-[3.1rem]"
            />
          </div>
          <p
            className="reveal hidden max-w-xs text-sm text-white/60 lg:block"
            style={{ "--reveal-delay": "200ms" }}
          >
            {journey.hint}
          </p>
        </div>

        {/* Desktop: 4 cột, cột đang chọn rộng hơn */}
        <div className="reveal mt-10 hidden gap-4 lg:flex" style={{ "--reveal-delay": "250ms" }}>
          {journey.steps.map((s, i) => {
            const on = active === i;
            return (
              <button
                key={s.n}
                type="button"
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={on}
                className={cn(
                  "group relative h-[calc(var(--screen)*0.6)] overflow-hidden rounded-[1.75rem] text-left transition-[flex] duration-[800ms] ease-out",
                  on ? "flex-[2.6]" : "flex-[1]",
                )}
              >
                <Pic
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className={cn(
                    "object-cover transition-transform duration-[1400ms] ease-out",
                    on ? "scale-100" : "scale-110",
                  )}
                  style={{ objectPosition: s.pos }}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10 transition-opacity duration-700",
                    on ? "opacity-100" : "opacity-90",
                  )}
                />
                <span className="absolute top-5 left-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-ink/30 text-sm font-medium tracking-wide tabular-nums backdrop-blur">
                  {s.n}
                </span>
                {/* tên bước dọc khi thu gọn */}
                <span
                  className={cn(
                    "absolute bottom-7 left-1/2 -translate-x-1/2 rotate-180 font-serif text-2xl whitespace-nowrap transition-all duration-500 [writing-mode:vertical-rl]",
                    on ? "pointer-events-none opacity-0" : "opacity-100",
                  )}
                >
                  {s.title}
                </span>
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-7 transition-all duration-700",
                    on ? "translate-y-0 opacity-100 delay-200" : "translate-y-6 opacity-0",
                  )}
                >
                  <h3 className="font-serif text-3xl">{s.title}</h3>
                  <p className="mt-2 max-w-md text-justify text-sm leading-relaxed text-white/80">
                    {s.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile: danh sách dọc có đường nối */}
        <ol className="relative mt-10 space-y-8 border-l border-white/15 pl-8 lg:hidden">
          {journey.steps.map((s) => (
            <li key={s.n} className="reveal relative">
              <span className="absolute top-0 -left-[2.55rem] flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-ink text-xs font-medium tabular-nums">
                {s.n}
              </span>
              <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Pic
                  src={s.image}
                  alt=""
                  fill
                  sizes="90vw"
                  className="object-cover"
                  style={{ objectPosition: s.pos }}
                />
              </div>
              <h3 className="font-serif text-2xl">{s.title}</h3>
              <p className="mt-1 text-justify text-sm leading-relaxed text-white/75">{s.desc}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
