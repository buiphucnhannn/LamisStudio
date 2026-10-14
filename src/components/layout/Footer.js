import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { href } from "@/i18n";
import { Facebook, Instagram, MapPin, Phone, Clock, Messenger } from "@/components/ui/Icons";
import CurrentYear from "./CurrentYear";

// Footer nền tối (ink) — chữ xám sương, có bản đồ Google Maps nhúng (không cần API key).
export default function Footer({ lang, site, nav, ui, footer }) {
  const socials = [
    { Icon: Facebook, href: site.facebook, label: "Facebook" },
    { Icon: Instagram, href: site.instagram, label: "Instagram" },
    { Icon: Messenger, href: site.messenger, label: "Messenger" },
  ];

  return (
    <footer data-nav-theme="dark" className="relative overflow-hidden bg-ink text-fog">
      <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[140px]" />

      <Container wide className="relative py-12 lg:py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.3fr_0.7fr]">
          {/* Brand */}
          <div>
            <Link
              href={href(lang, "/")}
              aria-label="Lamis Studio"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Logo className="h-16" light />
            </Link>
            <p className="mt-5 max-w-xs text-justify text-sm leading-relaxed text-fog/70">
              {footer.blurb}
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ Icon, href: url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-fog/80 transition hover:border-white hover:bg-white hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Liên hệ */}
          <div>
            <h4 className="mb-5 font-serif text-xl text-white">{ui.contact}</h4>
            <ul className="space-y-4 text-sm text-fog/75">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="-my-2 inline-block py-2 transition hover:text-white"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                <span>
                  {site.address}
                  <br />
                  <a
                    href={site.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-my-2 inline-block py-2 text-accent-light underline-offset-4 hover:underline"
                  >
                    {ui.directions}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.time} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>

          {/* Bản đồ */}
          <div>
            <h4 className="mb-5 font-serif text-xl text-white">{ui.map}</h4>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft">
              <iframe
                title="Lamis Studio map"
                src={site.mapsEmbed}
                className="h-44 w-full grayscale-[35%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* Menu */}
          {/* mobile: căn giữa (tiêu đề + các mục nằm ngang); từ md căn trái, xếp dọc như cũ */}
          <div className="text-center md:text-left">
            <h4 className="mb-5 font-serif text-xl text-white">{ui.menu}</h4>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-fog/75 md:block md:space-y-3">
              {nav.map((i) => (
                <li key={i.href}>
                  <Link
                    href={href(lang, i.href)}
                    className="inline-block py-2 transition hover:text-white lg:py-1"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container
          wide
          className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-fog/50 sm:flex-row"
        >
          <p>
            © <CurrentYear /> {site.name}. {footer.rights}
          </p>
          <p className="tracking-[0.2em] uppercase">{site.addressShort}</p>
        </Container>
      </div>
    </footer>
  );
}
