import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import { ArrowRight, Star } from "@/components/ui/Icons";

// Marquee dịch track -50% → một vòng (nửa track) phải dài hơn khung tối đa 1920px, không thì hở mép.
// Thẻ rộng 360px + gap 20px = 380px → lặp danh sách tới khi ≥ 1920px.
const fill = (items) => {
  const out = [...items];
  while (out.length * 380 < 1920) out.push(...items);
  return out;
};

/**
 * Đánh giá khách hàng (yêu cầu brief): tiêu đề + điểm đánh giá cùng một hàng (như khối Seasonal),
 * bên dưới là dải thẻ trích dẫn chạy chậm vô tận (dừng khi rê chuột).
 */
export default function Reviews({ reviews, site }) {
  const row = fill(reviews.items);

  return (
    <section id="reviews" className="relative overflow-hidden bg-fog py-16 lg:py-24">
      <Container wide>
        <p className="reveal eyebrow">{reviews.eyebrow}</p>
        {/* Tiêu đề và khối điểm chung một hàng, căn giữa theo chiều cao */}
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2
            className="reveal max-w-2xl h-display text-[2.2rem] sm:text-[2.8rem] lg:text-[3.3rem]"
            style={{ "--reveal-delay": "80ms" }}
          >
            {reviews.title}
          </h2>
          <div
            className="reveal flex shrink-0 items-center gap-5 self-start md:self-auto"
            style={{ "--reveal-delay": "200ms" }}
          >
            <div className="flex items-center gap-4 rounded-full border border-ink/10 bg-white/70 py-2 pr-5 pl-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink font-serif text-xl text-white">
                {reviews.rating}
              </span>
              <span>
                <span className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-3.5 w-3.5" />
                  ))}
                </span>
                <span className="mt-1 block text-[12px] text-ink-muted">{reviews.ratingNote}</span>
              </span>
            </div>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 text-sm font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink sm:inline-flex"
            >
              {reviews.more}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </Container>

      <div
        className="reveal marquee bleed-cap mt-12 overflow-hidden"
        style={{ "--reveal-delay": "300ms" }}
      >
        <ul className="marquee-track gap-5 py-2" style={{ "--marquee-duration": "90s" }}>
          {[...row, ...row].map((r, i) => (
            <li
              key={i}
              aria-hidden={i >= reviews.items.length}
              className="flex w-[300px] shrink-0 flex-col rounded-[1.5rem] border border-ink/[0.06] bg-white p-7 shadow-card sm:w-[360px]"
            >
              <span className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }, (_, k) => (
                  <Star key={k} className="h-3.5 w-3.5" />
                ))}
              </span>
              <blockquote className="mt-4 flex-1 font-serif text-[1.2rem] leading-snug text-ink">
                “{r.quote}”
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-fog-200">
                  <Pic
                    src={r.avatar.src}
                    alt=""
                    fill
                    sizes="44px"
                    className="object-cover"
                    style={{ objectPosition: r.avatar.pos }}
                  />
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">{r.name}</span>
                  <span className="text-[12px] text-ink-muted">{r.service}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
