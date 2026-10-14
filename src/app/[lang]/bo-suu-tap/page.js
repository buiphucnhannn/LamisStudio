import Link from "next/link";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import CollectionsGrid from "@/components/gallery/CollectionsGrid";
import { localize, href, isLocale } from "@/i18n";
import { collections, collectionsPage, countries, styles, ui } from "@/data/site";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const L = localize({ ui, collectionsPage }, lang);
  return {
    title: L.ui.collections,
    description: L.collectionsPage.desc,
    alternates: {
      canonical: href(lang, "/bo-suu-tap"),
      languages: { vi: href("vi", "/bo-suu-tap"), en: href("en", "/bo-suu-tap") },
    },
  };
}

export default async function CollectionsPage({ params }) {
  const { lang } = await params;
  const L = localize({ collections, collectionsPage, countries, styles, ui }, lang);
  const page = L.collectionsPage;

  return (
    <>
      {/* Hero: mỗi cột là 1 bộ sưu tập (3 ảnh xếp dọc), các cột trôi lên/xuống so le rất chậm */}
      <section
        data-nav-theme="dark"
        className="relative isolate flex h-[calc(var(--screen)*0.66)] min-h-[460px] items-center overflow-hidden bg-ink"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bleed-cap grid grid-cols-3 gap-2 px-2 md:grid-cols-6"
        >
          {L.collections.map((c, i) => {
            const imgs = [0, 1, 2].map((k) => c.images[(k + 1) % c.images.length]);
            return (
              <div
                key={c.slug}
                className={cn(
                  "relative h-full",
                  // mobile 3 cột, từ tablet 6 cột = 6 album (mỗi cột chỉ nhận 1 bộ class hiển thị)
                  i >= 3 && "hidden md:block",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 flex h-[128%] flex-col gap-2",
                    i % 2 ? "animate-drift-down" : "animate-drift-up",
                  )}
                >
                  {imgs.map((img, k) => (
                    <div key={k} className="relative flex-1 overflow-hidden rounded-xl">
                      <Pic
                        src={img.src}
                        alt=""
                        fill
                        quality={75}
                        sizes="(min-width: 768px) 17vw, 34vw"
                        className="object-cover saturate-[0.85]"
                        style={{ objectPosition: img.pos }}
                        preload={k === 0 && i < 3}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {/* Phủ tối, đậm dần xuống đáy (nơi đặt chữ) */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-ink/50" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/55 to-ink/35"
        />

        <Container wide className="text-white">
          <p className="mb-4 text-xs text-white/70 text-legible">
            <Link href={href(lang, "/")} className="-my-2 inline-block py-2 hover:text-white">
              {L.ui.home}
            </Link>
            <span className="mx-2">/</span>
            {L.ui.collections}
          </p>
          <p className="mb-4 eyebrow text-accent-light text-legible">{L.ui.collections}</p>
          <h1 className="max-w-4xl h-display text-[2.6rem] text-white text-legible-lg sm:text-[3.4rem] lg:text-[4.2rem]">
            {page.title}&nbsp;<em className="text-[#f3ece3] italic">{page.accent}</em>
          </h1>
          <p className="mt-5 max-w-xl text-justify text-[15px] leading-relaxed font-medium text-white/90 text-legible sm:text-base">
            {page.desc}
          </p>
        </Container>
      </section>

      <section className="bg-fog pt-10 pb-10 lg:pt-14 lg:pb-12">
        <Container wide>
          <CollectionsGrid
            lang={lang}
            collections={L.collections}
            countries={L.countries}
            styles={L.styles}
            ui={L.ui}
          />
        </Container>
      </section>

      <section className="bg-fog pb-16">
        <Container wide>
          <div className="reveal relative mt-6 overflow-hidden rounded-[1.75rem] bg-ink text-white">
            <div className="absolute inset-0 grid grid-cols-3">
              {page.ctaBg.map((b, i) => (
                <div key={b.src} className="relative">
                  <Pic
                    src={b.src}
                    alt=""
                    fill
                    sizes="33vw"
                    className="object-cover"
                    style={{ objectPosition: b.pos }}
                  />
                  {i > 0 && <span className="absolute inset-y-0 left-0 w-px bg-white/15" />}
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/70 to-ink/85" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />

            <div className="relative flex flex-col items-center gap-4 px-6 py-14 text-center sm:py-16">
              <p className="font-serif text-2xl text-accent-light italic">{page.ctaScript}</p>
              <h2 className="h-display text-3xl text-white sm:text-4xl">{page.ctaTitle}</h2>
              <p className="max-w-md text-sm text-white/75">{page.ctaDesc}</p>
              <button
                type="button"
                data-booking
                className="group mt-2 inline-flex items-center gap-3 rounded-full bg-white py-1.5 pr-1.5 pl-7 text-sm font-medium text-ink transition hover:bg-fog-100"
              >
                {L.ui.bookFree}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
