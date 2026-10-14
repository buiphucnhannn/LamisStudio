import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import { ArrowRight, Check, Clock, MapPin, Phone } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/**
 * Bảng giá tham khảo / giờ mở cửa / liên hệ — một section riêng tràn ngang (id="pricing").
 * Nền là ảnh ghép từ kho ảnh: 2 hàng ảnh trôi chậm ngược chiều nhau (marquee, dừng khi rê chuột)
 * + lớp phủ tối; nội dung chữ trắng đặt thẳng trên nền (không card) để hoà vào ảnh.
 */
export default function RentalInfo({ rental, site, ui }) {
  const half = Math.ceil(rental.collage.length / 2);
  const rows = [rental.collage.slice(0, half), rental.collage.slice(half)];

  return (
    <section
      id="pricing"
      data-nav-theme="dark"
      className="relative isolate overflow-hidden bg-ink py-20 lg:py-28"
    >
      {/* Nền ảnh ghép: mỗi hàng nhân đôi danh sách để marquee chạy liền mạch (track dịch -50%) */}
      <div aria-hidden className="absolute inset-0 -z-10 bleed-cap grid grid-rows-2 gap-2 py-2">
        {rows.map((row, r) => (
          <div key={r} className="overflow-hidden">
            <div
              className={cn("marquee-track h-full gap-2", r === 1 && "reverse")}
              style={{ "--marquee-duration": r === 0 ? "90s" : "110s" }}
            >
              {[...row, ...row].map((img, i) => (
                <div
                  key={i}
                  className="relative h-full w-[150px] shrink-0 overflow-hidden rounded-xl sm:w-[200px] lg:w-[240px]"
                >
                  <Pic
                    src={img.src}
                    alt=""
                    fill
                    quality={75}
                    sizes="240px"
                    className="object-cover saturate-[0.8]"
                    style={{ objectPosition: img.pos }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Lớp phủ: tối đều + đậm thêm ở dải giữa (nơi đặt chữ) để chữ trắng luôn dễ đọc, mép trên/dưới lộ ảnh hơn */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/75" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/10 via-ink/55 to-ink/10"
      />

      {/* Không dùng card: nội dung đặt thẳng trên nền ảnh (kiểu editorial), chia cột bằng đường kẻ mảnh */}
      <Container wide>
        <div className="grid gap-10 text-white lg:grid-cols-3 lg:gap-0">
          <div className="reveal lg:pr-12">
            <p className="eyebrow text-accent-light">{rental.priceTitle}</p>
            <p className="mt-4 font-serif text-4xl sm:text-5xl">{ui.priceContact}</p>
            <p className="mt-4 max-w-sm text-justify text-[15px] leading-relaxed text-white/75">
              {rental.priceNote}
            </p>
            {/* Bảng giá tham khảo: cùng kiểu dòng kẻ đứt với cột giờ mở cửa */}
            <ul className="mt-5 max-w-sm space-y-2.5">
              {rental.prices.map((p) => (
                <li
                  key={p.name}
                  className="flex items-baseline justify-between gap-4 border-b border-dashed border-white/15 pb-2.5 text-sm"
                >
                  <span className="text-white/70">{p.name}</span>
                  <span className="font-medium tabular-nums">{p.price}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/75">
              {rental.perks.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-accent-light" /> {p}
                </li>
              ))}
            </ul>
            <button
              type="button"
              data-booking
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white py-1.5 pr-1.5 pl-6 text-sm font-medium text-ink transition hover:bg-fog-100"
            >
              {ui.bookFree}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>

          <div
            className="reveal border-t border-white/15 pt-8 lg:flex lg:flex-col lg:justify-center lg:border-t-0 lg:border-l lg:px-12 lg:pt-0"
            style={{ "--reveal-delay": "120ms" }}
          >
            <p className="flex items-center gap-2 text-[11px] tracking-[0.25em] text-white/55 uppercase">
              <Clock className="h-4 w-4 text-accent-light" /> {ui.openHours}
            </p>
            <ul className="mt-5 space-y-3">
              {site.hours.map((h) => (
                <li
                  key={h.time}
                  className="flex items-baseline justify-between gap-4 border-b border-dashed border-white/15 pb-3 text-sm"
                >
                  <span className="text-white/70">{h.days}</span>
                  <span className="font-medium tabular-nums">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="reveal border-t border-white/15 pt-8 lg:flex lg:flex-col lg:justify-center lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12"
            style={{ "--reveal-delay": "240ms" }}
          >
            <p className="flex items-center gap-2 text-[11px] tracking-[0.25em] text-white/55 uppercase">
              <MapPin className="h-4 w-4 text-accent-light" /> {ui.contact}
            </p>
            <p className="mt-5 text-justify text-sm leading-relaxed text-white/75">
              {rental.pickup}
            </p>
            <a
              href={site.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 -mb-2 inline-block self-start py-2 text-sm underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
            >
              {ui.directions}
            </a>
            <a
              href={`tel:${site.phoneRaw}`}
              className="mt-5 flex items-center gap-2 self-start font-serif text-3xl"
            >
              <Phone className="h-5 w-5 text-accent-light" /> {site.phone}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
