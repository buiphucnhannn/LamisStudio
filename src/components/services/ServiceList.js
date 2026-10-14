import Link from "next/link";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SplitText from "@/components/fx/SplitText";
import Ornament from "@/components/ui/Ornaments";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { href } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * 5 dịch vụ chính: mỗi dịch vụ một hàng, ảnh dọc và chữ xen kẽ trái/phải (editorial zig-zag),
 * số thứ tự lớn mờ phía sau, 3 điểm nổi bật + nút đặt lịch (chọn sẵn bộ sưu tập) & xem album.
 */
export default function ServiceList({ lang, list }) {
  return (
    <section
      id="dich-vu-chinh"
      className="relative isolate overflow-hidden bg-fog py-16 lg:pt-24 lg:pb-20"
    >
      <Ornament
        name="aperture"
        float
        className="absolute top-16 right-[6%] -z-10 hidden w-24 text-ink/[0.13] lg:block"
      />
      <Container wide>
        <div className="max-w-2xl">
          <p className="reveal eyebrow">{list.eyebrow}</p>
          <SplitText
            text={list.title}
            className="mt-4 h-display text-[2.2rem] sm:text-[2.8rem] lg:text-[3.2rem]"
          />
        </div>

        <div className="mt-12 space-y-16 lg:mt-16 lg:space-y-24">
          {list.items.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={s.n}
                className={cn(
                  "relative grid items-center gap-10 lg:gap-16 xl:gap-20",
                  flip
                    ? "lg:grid-cols-[1.1fr_0.9fr] lg:[&>*:first-child]:order-2"
                    : "lg:grid-cols-[0.9fr_1.1fr]",
                )}
              >
                {/* Ảnh */}
                <div
                  className={cn(
                    "reveal relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-[2rem] bg-fog-200 lg:mx-0",
                    flip && "lg:ml-auto",
                  )}
                  data-reveal="clip"
                >
                  <Pic
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 34vw, 90vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.03]"
                    style={{ objectPosition: s.pos }}
                  />
                  <span className="absolute top-5 left-5 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium tracking-[0.25em] text-ink uppercase backdrop-blur lg:text-[10px]">
                    {s.sub}
                  </span>
                </div>

                {/* Chữ */}
                <div className="relative">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -left-4 hidden font-serif text-[12rem] leading-none text-ink/[0.05] select-none lg:block"
                  >
                    {s.n}
                  </span>
                  <div className="relative">
                    <p className="reveal eyebrow">{s.sub}</p>
                    <h3
                      className="reveal mt-3 font-serif text-[2rem] leading-tight text-ink sm:text-[2.4rem]"
                      style={{ "--reveal-delay": "80ms" }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="reveal mt-5 max-w-md text-justify text-[15px] leading-relaxed text-ink-soft"
                      style={{ "--reveal-delay": "160ms" }}
                    >
                      {s.desc}
                    </p>
                    <ul className="reveal mt-6 space-y-2.5" style={{ "--reveal-delay": "240ms" }}>
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm text-ink">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <div
                      className="reveal mt-8 flex flex-wrap gap-3"
                      style={{ "--reveal-delay": "320ms" }}
                    >
                      <button
                        type="button"
                        data-booking={s.collection || ""}
                        className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium text-white transition hover:bg-graphite"
                      >
                        {s.collection ? list.book : list.consult}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                      {s.collection && (
                        <Link
                          href={href(lang, `/bo-suu-tap/${s.collection}`)}
                          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-[13px] font-medium text-ink transition hover:border-ink hover:bg-ink hover:text-white"
                        >
                          {list.viewCollection}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
