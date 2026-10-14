import { Suspense } from "react";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import AlbumGallery from "@/components/gallery/AlbumGallery";
import { LOCALES, localize, href, isLocale, collectionSlugEn, collectionSlugVi } from "@/i18n";
import { collections, getCollection, countries, styles, ui } from "@/data/site";
import { ArrowRight } from "@/components/ui/Icons";
import { noOrphan } from "@/lib/utils";

// Bản tiếng Anh dùng slug tiếng Anh (/en/collections/hanfu); dữ liệu luôn tra theo slug tiếng Việt.
const toViSlug = (lang, slug) => (lang === "en" ? collectionSlugVi(slug) : slug);

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    collections.map((c) => ({ lang, slug: lang === "en" ? collectionSlugEn(c.slug) : c.slug })),
  );
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const viSlug = toViSlug(lang, slug);
  const c = getCollection(viSlug);
  if (!c) return {};
  const L = localize(c, lang);
  return {
    title: `${L.name} — ${L.concept}`,
    description: L.desc,
    alternates: {
      canonical: href(lang, `/bo-suu-tap/${viSlug}`),
      languages: {
        vi: href("vi", `/bo-suu-tap/${viSlug}`),
        en: href("en", `/bo-suu-tap/${viSlug}`),
      },
    },
    openGraph: { images: [{ url: c.cover, width: 1200, height: 1500, alt: L.name }] },
  };
}

// Khung chờ cùng bố cục với trang thật (ảnh bìa + lưới ảnh). Mọi album đã prerender qua
// generateStaticParams nên khi mở trang trực tiếp sẽ không thấy khung này; nó chỉ hiện thoáng qua
// khi điều hướng client trước lúc nội dung riêng của album stream về.
function AlbumSkeleton() {
  return (
    <>
      <section
        data-nav-theme="dark"
        className="h-[calc(var(--screen)*0.66)] min-h-[460px] w-full animate-pulse bg-ink"
      />
      <section className="bg-fog pt-14 pb-16 lg:pt-20">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_2.2fr] lg:gap-16">
            <div className="h-64 animate-pulse rounded-2xl bg-fog-200" />
            <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] w-[calc((100%-0.75rem)/2)] animate-pulse rounded-xl bg-fog-200 md:w-[calc((100%-1.5rem)/3)] lg:w-[calc((100%-2rem)/3)]"
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// Next 16 + Partial Prefetching: App Shell dùng chung cho mọi album nên không được đọc `params`
// ở ngoài <Suspense> → truyền promise xuống component con, đọc bên trong boundary.
export default function CollectionDetailPage({ params }) {
  return (
    <Suspense fallback={<AlbumSkeleton />}>
      <CollectionDetail params={params} />
    </Suspense>
  );
}

async function CollectionDetail({ params }) {
  const { lang, slug: urlSlug } = await params;
  const slug = toViSlug(lang, urlSlug);
  const raw = getCollection(slug);
  if (!raw) notFound();
  // URL tiếng Anh còn dùng slug tiếng Việt (link cũ) → chuyển hẳn sang slug tiếng Anh
  if (lang === "en" && urlSlug !== collectionSlugEn(slug))
    permanentRedirect(href("en", `/bo-suu-tap/${slug}`));

  const idx = collections.findIndex((x) => x.slug === slug);
  const nextRaw = collections[(idx + 1) % collections.length];
  const L = localize({ c: raw, next: nextRaw, countries, styles, ui }, lang);
  const { c, next } = L;
  const images = c.images.map((img, i) => ({ ...img, alt: `${c.name} — ${i + 1}` }));

  return (
    <>
      {/* Header album — bố cục editorial: desktop nền tối bên trái (chữ), ảnh chiếm 62% bên phải
          và hoà dần vào nền → chữ không bao giờ đè lên mặt người; khung ảnh ~1.8:1 nên ảnh dọc ít bị cắt.
          Mobile: ảnh phủ toàn khung + lớp tối. Ảnh & vị trí cắt riêng cho hero: `hero` trong data/site.js */}
      <section
        data-nav-theme="dark"
        className="relative h-[calc(var(--screen)*0.66)] min-h-[460px] w-full overflow-hidden bg-ink"
      >
        <div className="absolute inset-0 bleed-cap"></div>{" "}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
          <Pic
            src={c.hero.src}
            alt={c.name}
            fill
            preload
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-cover"
            style={{ objectPosition: c.hero.pos }}
          />
          {/* desktop: mép trái ảnh hoà vào nền tối */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/30 to-ink/5 lg:block" />
        </div>
        {/* mobile: phủ tối toàn khung để chữ đọc được trên ảnh */}
        <div className="absolute inset-0 bg-ink/55 lg:hidden" />
        {/* Cụm chữ căn giữa theo toàn bộ chiều cao nền */}
        <Container wide className="relative flex h-full flex-col justify-center">
          <p className="mb-4 text-xs text-white/75 text-legible">
            <Link href={href(lang, "/")} className="-my-2 inline-block py-2 hover:text-white">
              {L.ui.home}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={href(lang, "/bo-suu-tap")}
              className="-my-2 inline-block py-2 hover:text-white"
            >
              {L.ui.collections}
            </Link>
            <span className="mx-2">/</span>
            {c.name}
          </p>
          <p className="text-[11px] tracking-[0.3em] text-white/90 uppercase text-legible">
            {c.sub}
          </p>
          <h1 className="mt-3 h-display text-5xl text-white text-legible-lg sm:text-6xl lg:text-7xl">
            {c.name}
          </h1>
          <p className="mt-4 max-w-xl text-sm font-medium text-white/90 text-legible sm:text-base">
            {c.concept}
          </p>
        </Container>
      </section>

      {/* Mô tả + gallery */}
      <section className="bg-fog pt-14 pb-16 lg:pt-20">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_2.2fr] lg:gap-16">
            <aside className="reveal lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">{L.ui.aboutCollection}</p>
              <p className="mt-4 text-justify text-[15px] leading-relaxed text-ink-soft">
                {noOrphan(c.desc)}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-ink/10 bg-white/70 p-5 text-sm">
                <div>
                  <dt className="text-[11px] tracking-[0.25em] text-ink-muted uppercase lg:text-[10px]">
                    {L.ui.byCountry}
                  </dt>
                  <dd className="mt-1 font-medium text-ink">{L.countries[c.country]}</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.25em] text-ink-muted uppercase lg:text-[10px]">
                    {L.ui.byStyle}
                  </dt>
                  <dd className="mt-1 font-medium text-ink">{L.styles[c.style]}</dd>
                </div>
                {/* hàng dưới: số ảnh trong album | giá thuê (theo brief: liên hệ) */}
                <div className="border-t border-ink/10 pt-4">
                  <dt className="text-[11px] tracking-[0.25em] text-ink-muted uppercase lg:text-[10px]">
                    {L.ui.album}
                  </dt>
                  <dd className="mt-1 font-medium text-ink">
                    {images.length} {L.ui.photos}
                  </dd>
                </div>
                <div className="border-t border-ink/10 pt-4">
                  <dt className="text-[11px] tracking-[0.25em] text-ink-muted uppercase lg:text-[10px]">
                    {L.ui.priceLabel}
                  </dt>
                  <dd className="mt-1 font-medium text-ink">{c.price ?? L.ui.priceValue}</dd>
                </div>
              </dl>

              <button
                type="button"
                data-booking={c.slug}
                className="group mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink py-1.5 pr-1.5 pl-6 text-sm font-medium text-white transition hover:bg-graphite"
              >
                {L.ui.bookThis}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </aside>

            <div>
              <AlbumGallery images={images} name={c.name} />
            </div>
          </div>
        </Container>
      </section>

      {/* Album tiếp theo */}
      <section className="bg-fog pb-16">
        <Container wide>
          <Link
            href={href(lang, `/bo-suu-tap/${next.slug}`)}
            className="group reveal flex items-center justify-between gap-6 rounded-[1.75rem] bg-white/70 p-5 transition hover:shadow-card sm:p-6"
          >
            <div className="flex items-center gap-5">
              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-20">
                <Pic
                  src={next.cover}
                  alt={next.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                  style={{ objectPosition: next.coverPos }}
                />
              </div>
              <div>
                <p className="text-[11px] tracking-[0.3em] text-ink-muted uppercase lg:text-[10px]">
                  {L.ui.nextCollection}
                </p>
                <p className="mt-1 font-serif text-2xl text-ink sm:text-3xl">{next.name}</p>
                <p className="text-xs text-ink-soft">{next.concept}</p>
              </div>
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition group-hover:bg-ink group-hover:text-white">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </Container>
      </section>
    </>
  );
}
