import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import Parallax from "@/components/fx/Parallax";
import { cn } from "@/lib/utils";

/**
 * Về Lamis: câu tuyên ngôn lớn kiểu serif với các từ hiện dần, ảnh lớn parallax bên phải,
 * 2 polaroid xoè nhẹ và 3 con số nổi bật.
 */
export default function About({ about }) {
  return (
    <section
      id="about"
      className="relative flex screen items-center overflow-hidden bg-fog py-16 lg:py-14"
    >
      <Container wide className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="reveal eyebrow">{about.eyebrow}</p>
          <h2 className="mt-5 h-display text-[2.3rem] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4rem]">
            {about.manifesto.map((m, i) => (
              <span
                key={i}
                className={cn(
                  "reveal mr-[0.28em] inline-block",
                  m.accent && "text-ink-soft italic",
                )}
                style={{ "--reveal-delay": `${80 + i * 110}ms` }}
              >
                {m.text}
              </span>
            ))}
          </h2>
          <div className="mt-8 max-w-xl space-y-4 text-justify text-[15px] leading-relaxed text-ink-soft sm:text-base">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="reveal" style={{ "--reveal-delay": `${500 + i * 100}ms` }}>
                {p}
              </p>
            ))}
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/10 pt-8">
            {about.highlights.map((h, i) => (
              <div
                key={h.label}
                className="reveal"
                style={{ "--reveal-delay": `${700 + i * 100}ms` }}
              >
                <dt className="font-serif text-3xl text-ink sm:text-4xl">{h.value}</dt>
                <dd className="mt-1 text-[12px] leading-snug text-ink-muted">{h.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[480px]">
          <Parallax
            speed={0.08}
            className="reveal relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-fog-200"
            data-reveal="clip"
          >
            <Pic
              src={about.main.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              style={{ objectPosition: about.main.pos }}
            />
          </Parallax>
          {about.polaroids.map((p, i) => (
            <Parallax
              key={p.src}
              // Mặt 2 người trong ảnh nền nằm ở ~1/3 trên → cả 2 polaroid đặt ở nửa dưới, so le nhau.
              // Biên độ parallax nhỏ (≤ ~30px) để dù cuộn tới đâu polaroid cũng không trôi lên che mặt.
              speed={i === 0 ? -0.04 : 0.05}
              className={cn(
                "absolute hidden w-[38%] max-w-[200px] lg:block",
                i === 0 ? "bottom-20 -left-10 -rotate-6" : "top-[30%] -right-8 rotate-[5deg]",
              )}
            >
              {/* .reveal (animation transform) đặt ở phần tử con — <Parallax> đã dùng transform inline */}
              <div
                className="reveal polaroid"
                data-reveal="scale"
                style={{ "--reveal-delay": `${300 + i * 150}ms` }}
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden",
                    p.square ? "aspect-square" : "aspect-[4/5]",
                  )}
                >
                  <Pic
                    src={p.src}
                    alt=""
                    fill
                    sizes="200px"
                    className="object-cover"
                    style={{ objectPosition: p.pos }}
                  />
                </div>
                <p className="mt-2 text-center font-serif text-sm text-ink-soft italic">
                  {p.caption}
                </p>
              </div>
            </Parallax>
          ))}
        </div>
      </Container>
    </section>
  );
}
