import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SplitText from "@/components/fx/SplitText";
import Parallax from "@/components/fx/Parallax";
import Ornament, { Watermark } from "@/components/ui/Ornaments";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * Hero trang Dịch vụ: chữ bên trái, bên phải 3 ảnh dọc so le (ảnh giữa cao nhất) có parallax nhẹ.
 * Lưu ý: .reveal đặt ở phần tử CON của <Parallax> (Parallax dùng transform inline).
 */
export default function ServicesHero({ hero, ui }) {
  const [a, b, c] = hero.images;
  const frames = [
    { img: a, h: "h-[78%]", speed: 0.05, delay: 0 },
    { img: b, h: "h-full", speed: -0.04, delay: 120 },
    { img: c, h: "h-[86%]", speed: 0.07, delay: 240 },
  ];

  return (
    <section className="relative isolate flex screen items-center overflow-hidden bg-fog pt-28 pb-16 lg:pt-28 lg:pb-16">
      <Ornament
        name="sparkle"
        float
        className="absolute top-[18%] left-[44%] -z-10 hidden w-10 text-ink/[0.13] lg:block"
      />
      <Watermark
        text="Services"
        className="absolute top-24 right-3 -z-10 text-[5rem] text-ink/[0.05] sm:top-28 lg:top-auto lg:right-auto lg:bottom-4 lg:left-8 lg:text-[16rem]"
      />
      <Container wide>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <p className="reveal eyebrow">{hero.eyebrow}</p>
            <SplitText
              as="h1"
              text={hero.title}
              accent={hero.accent}
              breakBeforeAccent
              className="mt-5 h-display text-[2.6rem] leading-[1.12] sm:text-[3.4rem] lg:text-[3.8rem] xl:text-[4.4rem]"
            />
            <p
              className="reveal mt-6 max-w-lg text-justify text-[15px] leading-relaxed text-ink-soft sm:text-base"
              style={{ "--reveal-delay": "250ms" }}
            >
              {hero.desc}
            </p>
            <div
              className="reveal mt-8 flex flex-wrap items-center gap-3"
              style={{ "--reveal-delay": "350ms" }}
            >
              <button
                type="button"
                data-booking
                className="group inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-6 text-sm font-medium text-white shadow-card transition hover:bg-graphite"
              >
                {ui.book}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
              <a
                href="#dich-vu-chinh"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-medium text-ink transition hover:border-ink hover:bg-ink hover:text-white"
              >
                {hero.ctaSecondary}
              </a>
            </div>
            <dl
              className="reveal mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/10 pt-7"
              style={{ "--reveal-delay": "450ms" }}
            >
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-serif text-3xl text-ink sm:text-4xl">{s.value}</dt>
                  <dd className="mt-1 text-[12px] leading-snug text-ink-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 3 ảnh dọc so le — mobile: 3 khung hẹp cao ~1.9× rộng để thấy trọn người */}
          <div className="relative mb-10 grid h-[70vw] grid-cols-3 items-end gap-3 sm:h-[52vw] lg:mb-0 lg:h-[calc(var(--screen)*0.66)] lg:gap-4">
            {frames.map(({ img, h, speed, delay }, i) => (
              <Parallax key={img.src} desktopOnly speed={speed} className={h}>
                <div
                  className="reveal relative h-full w-full overflow-hidden rounded-[1.5rem] bg-fog-200"
                  data-reveal="clip"
                  style={{ "--reveal-delay": `${delay}ms` }}
                >
                  <Pic
                    src={img.src}
                    alt=""
                    fill
                    preload={i === 1}
                    sizes="(min-width:1024px) 18vw, 30vw"
                    className="object-cover"
                    style={{ objectPosition: img.pos }}
                  />
                </div>
              </Parallax>
            ))}
            <p className="pointer-events-none absolute right-0 -bottom-9 font-serif text-2xl text-ink-soft italic">
              {hero.script}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
