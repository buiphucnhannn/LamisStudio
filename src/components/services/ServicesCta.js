import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import { ArrowRight, Zalo } from "@/components/ui/Icons";

// CTA cuối trang Dịch vụ: nền ghép 3 ảnh dọc + lớp phủ tối, nút mở popup đặt lịch và nhắn Zalo.
export default function ServicesCta({ cta, site, ui }) {
  return (
    <section
      data-nav-theme="dark"
      className="relative isolate overflow-hidden bg-ink py-20 text-white lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bleed-cap grid grid-cols-3">
        {cta.bg.map((b, i) => (
          <div key={b.src} className="relative">
            <Pic
              src={b.src}
              alt=""
              fill
              quality={75}
              sizes="34vw"
              className="object-cover saturate-[0.8]"
              style={{ objectPosition: b.pos }}
            />
            {i > 0 && <span className="absolute inset-y-0 left-0 w-px bg-white/15" />}
          </div>
        ))}
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/70" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/10 via-ink/50 to-ink/10"
      />

      <Container wide className="flex flex-col items-center text-center">
        <p className="reveal font-serif text-2xl text-accent-light italic text-legible sm:text-3xl">
          {cta.script}
        </p>
        <h2
          className="reveal mt-4 max-w-3xl h-display text-[2.3rem] text-balance text-white text-legible-lg sm:text-[3rem]"
          style={{ "--reveal-delay": "100ms" }}
        >
          {cta.title}
        </h2>
        <p
          className="reveal mt-4 max-w-md text-[15px] text-balance text-white/85 text-legible"
          style={{ "--reveal-delay": "200ms" }}
        >
          {cta.desc}
        </p>
        <div
          className="reveal mt-8 flex flex-wrap justify-center gap-3"
          style={{ "--reveal-delay": "300ms" }}
        >
          <button
            type="button"
            data-booking
            className="group inline-flex items-center gap-3 rounded-full bg-white py-1.5 pr-1.5 pl-7 text-sm font-medium text-ink transition hover:bg-fog-100"
          >
            {ui.bookFree}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
          <a
            href={site.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm text-white transition hover:bg-white hover:text-ink"
          >
            <Zalo className="h-5 w-5" /> {cta.zalo} {site.phone}
          </a>
        </div>
      </Container>
    </section>
  );
}
