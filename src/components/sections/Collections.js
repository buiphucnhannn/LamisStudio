"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SplitText from "@/components/fx/SplitText";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { href } from "@/i18n";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * Bộ sưu tập dạng "accordion" ngang: rê chuột vào cột nào, cột đó nở rộng.
 * Mobile: cuộn ngang snap từng thẻ.
 */
export default function Collections({ lang, collections, ui, heading }) {
  const [active, setActive] = useState(1);
  const allHref = href(lang, "/bo-suu-tap");
  const linkFor = (slug) => href(lang, `/bo-suu-tap/${slug}`);

  return (
    <section
      id="collections"
      className="relative flex screen flex-col justify-center overflow-hidden bg-fog py-16 lg:py-14"
    >
      <Container wide>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="reveal eyebrow">{heading.eyebrow}</p>
            <SplitText
              text={heading.title}
              accent={heading.accent}
              className="mt-4 h-display text-[2.2rem] sm:text-[2.8rem] lg:text-[3.3rem]"
            />
          </div>
          <div className="reveal flex items-center gap-6" style={{ "--reveal-delay": "150ms" }}>
            <p className="hidden max-w-xs text-justify text-sm text-ink-soft lg:block">
              {ui.hover}
            </p>
            <Button href={allHref} arrow>
              {ui.viewAll}
            </Button>
          </div>
        </div>

        {/* Desktop accordion */}
        <div
          className="reveal mt-8 hidden h-[calc(var(--screen)*0.62)] min-h-[440px] gap-3 lg:flex"
          data-reveal="scale"
          style={{ "--reveal-delay": "200ms" }}
        >
          {collections.map((c, i) => {
            const on = active === i;
            return (
              <Link
                key={c.slug}
                href={linkFor(c.slug)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "group relative block overflow-hidden rounded-[1.75rem] bg-fog-200 transition-[flex] duration-[800ms] ease-out",
                  on ? "flex-[3.2]" : "flex-[1]",
                )}
              >
                <Pic
                  src={c.cover}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className={cn(
                    "object-cover transition-transform duration-[1400ms] ease-out",
                    on ? "scale-100" : "scale-110",
                  )}
                  style={{ objectPosition: c.coverPos }}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent transition-opacity duration-700",
                    on ? "opacity-100" : "opacity-80",
                  )}
                />

                <div
                  className={cn(
                    "absolute bottom-7 left-1/2 -translate-x-1/2 rotate-180 font-serif text-2xl whitespace-nowrap text-white transition-all duration-500 [writing-mode:vertical-rl]",
                    on ? "pointer-events-none opacity-0" : "opacity-100",
                  )}
                >
                  {c.name}
                </div>

                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 p-8 transition-all duration-700",
                    on ? "translate-y-0 opacity-100 delay-200" : "translate-y-6 opacity-0",
                  )}
                >
                  <p className="text-[11px] tracking-[0.3em] text-white/70 uppercase lg:text-[10px]">
                    {c.sub}
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-6">
                    <div className="max-w-md">
                      <h3 className="font-serif text-4xl text-white">{c.name}</h3>
                      <p className="mt-2 line-clamp-2 text-justify text-sm leading-relaxed text-white/80">
                        {c.concept}
                      </p>
                    </div>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-ink transition group-hover:bg-fog-100">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </div>
                </div>

                <span className="absolute top-5 left-5 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium tracking-wider text-ink backdrop-blur lg:text-[10px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile: cuộn ngang */}
        <p className="mt-6 text-[11px] tracking-[0.25em] text-ink-muted uppercase lg:hidden">
          {ui.swipe}
        </p>
        <div className="-mx-5 mt-4 no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 lg:hidden">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              href={linkFor(c.slug)}
              className="reveal relative block h-[60svh] min-h-[420px] w-[78vw] shrink-0 snap-center overflow-hidden rounded-[1.5rem] bg-fog-200 sm:w-[52vw]"
              style={{ "--reveal-delay": `${i * 80}ms` }}
            >
              <Pic
                src={c.cover}
                alt={c.name}
                fill
                sizes="80vw"
                className="object-cover"
                style={{ objectPosition: c.coverPos }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <p className="text-[11px] tracking-[0.25em] text-white/70 uppercase lg:text-[10px]">
                    {c.sub}
                  </p>
                  <h3 className="mt-1 font-serif text-3xl text-white">{c.name}</h3>
                  <p className="mt-1 text-xs text-white/75">{c.concept}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
