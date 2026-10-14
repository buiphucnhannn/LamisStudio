import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SectionHeading from "@/components/ui/SectionHeading";
import Ornament from "@/components/ui/Ornaments";

/**
 * Thuê thế nào: 4 bước (dùng chung dữ liệu với Hành trình ở trang Dịch vụ) (thẻ ảnh dọc so le). Thông tin giá / giờ / nhận đồ nằm ở section RentalInfo ngay sau.
 * Đệm dưới lớn hơn đệm trên vì thẻ chẵn lệch xuống 2rem (lg:even:translate-y-8).
 */
export default function Rental({ rental }) {
  return (
    <section
      id="rental"
      className="relative isolate overflow-hidden bg-fog pt-16 pb-20 lg:pt-16 lg:pb-32"
    >
      <Ornament
        name="umbrella"
        float
        className="absolute top-[4%] right-[24%] -z-10 hidden w-28 text-ink/[0.13] lg:block"
      />
      <Ornament
        name="lipstick"
        float
        delay={1000}
        className="absolute top-[5%] right-[9%] -z-10 hidden w-16 text-ink/[0.13] lg:block"
      />
      <Ornament
        name="sparkle"
        float
        delay={2000}
        className="absolute top-[11%] right-[38%] -z-10 hidden w-8 text-ink/[0.13] lg:block"
      />
      <Container wide>
        <SectionHeading eyebrow={rental.eyebrow} title={rental.title} />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rental.steps.map((s, i) => (
            <li
              key={s.n}
              className="reveal group relative overflow-hidden rounded-[1.5rem] bg-fog-200 lg:even:translate-y-8"
              style={{ "--reveal-delay": `${i * 120}ms` }}
            >
              <div className="relative aspect-[4/5]">
                <Pic
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  style={{ objectPosition: s.pos }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                <span className="font-serif text-sm text-white/70">{s.n}</span>
                <h3 className="mt-1 font-serif text-2xl">{s.title}</h3>
                <p className="mt-2 text-justify text-sm leading-relaxed text-white/80">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
