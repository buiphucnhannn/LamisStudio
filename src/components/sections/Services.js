"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { href } from "@/i18n";
import { ArrowRight } from "@/components/ui/Icons";
import Ornament from "@/components/ui/Ornaments";

/**
 * Dịch vụ: danh sách 5 mục bên trái, rê chuột vào mục nào thì ảnh bên phải đổi theo (crossfade + ken burns).
 * Mobile: mỗi mục là một thẻ có ảnh nhỏ.
 */
export default function Services({ lang, services, ui }) {
  const [active, setActive] = useState(0);
  const items = services.items;
  const current = items[active];

  return (
    <section
      id="services"
      className="relative isolate flex screen items-center overflow-hidden bg-fog py-16 lg:py-20"
    >
      <Ornament
        name="aperture"
        float
        delay={1500}
        className="absolute right-[14%] bottom-[3%] -z-10 hidden w-20 text-ink/[0.13] lg:block"
      />
      <Container wide className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={services.eyebrow} title={services.title} desc={services.desc} />

          <ul className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
            {items.map((s, i) => {
              const on = active === i;
              return (
                <li
                  key={s.n}
                  className="reveal"
                  style={{ "--reveal-delay": `${200 + i * 80}ms` }}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="group flex w-full items-baseline gap-4 py-4 text-left"
                    aria-expanded={on}
                  >
                    <span
                      className={cn(
                        // Số dùng font sans + tabular-nums: serif Cormorant có số kiểu "old-style" (thấp/lệch dòng) nhìn như lỗi font
                        "w-7 shrink-0 font-sans text-sm font-medium tracking-wide tabular-nums transition-colors",
                        on ? "text-ink" : "text-ink-muted",
                      )}
                    >
                      {s.n}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block font-serif text-xl leading-snug transition-colors sm:text-[1.4rem]",
                          on ? "text-ink" : "text-ink/55 group-hover:text-ink",
                        )}
                      >
                        {s.title}
                      </span>
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                          on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        {/* padding nằm TRONG phần tử overflow-hidden để không bị cắt khi grid-rows thu/mở */}
                        <span className="block overflow-hidden">
                          <span className="block pt-1.5 text-justify text-[13.5px] leading-relaxed text-ink-soft">
                            {s.desc}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>

                  {/* Mobile: ảnh nhỏ của mục đang mở */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-500 lg:hidden",
                      on ? "max-h-[320px] pb-5 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-fog-200">
                      <Pic
                        src={s.image}
                        alt=""
                        fill
                        sizes="90vw"
                        className="object-cover"
                        style={{ objectPosition: s.pos }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop: khung ảnh đổi theo mục. Khung luôn là CÙNG MỘT <div> (không đổi thẻ theo mục):
            đổi thẻ khiến React tạo node mới → mất animation hiện dần của reveal → card co lại.
            Mục có `collection` thì phủ một <Link> trong suốt lên toàn card; mục không có thì chỉ là ảnh. */}
        <div
          className="group reveal relative hidden aspect-[4/5] max-h-[calc(var(--screen)*0.74)] w-full overflow-hidden rounded-[1.75rem] bg-fog-200 lg:block"
          data-reveal="clip"
          style={{ "--reveal-delay": "200ms" }}
        >
          {items.map((s, i) => (
            <div
              key={s.n}
              className={cn(
                "absolute inset-0 transition-opacity duration-[900ms] ease-out",
                active === i ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={active !== i}
            >
              <Pic
                src={s.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className={cn("object-cover", active === i && "animate-kenburns")}
                style={{ objectPosition: s.pos }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 text-white">
            <div>
              <p className="text-[11px] tracking-[0.3em] text-white/70 uppercase lg:text-[10px]">
                {current.n}
              </p>
              <p className="mt-1 font-serif text-2xl">{current.title}</p>
            </div>
            {current.collection && (
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink transition duration-300 group-hover:translate-x-0.5 group-hover:bg-fog-100">
                <ArrowRight className="h-5 w-5" />
              </span>
            )}
          </div>
          {current.collection && (
            <Link
              href={href(lang, `/bo-suu-tap/${current.collection}`)}
              aria-label={`${ui.viewAlbum}: ${current.title}`}
              className="absolute inset-0 z-10 rounded-[1.75rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            />
          )}
        </div>
      </Container>
    </section>
  );
}
