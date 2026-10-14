import { siteConfig } from "@/config/site";
import { localize, href } from "@/i18n";
import {
  hero,
  marquee,
  about,
  featuredCollections,
  collections,
  services,
  rental,
  moments,
  seasonal,
  reviews,
  contact,
  ui,
  t,
} from "@/data/site";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Collections from "@/components/sections/Collections";
import Services from "@/components/sections/Services";
import Rental from "@/components/sections/Rental";
import RentalInfo from "@/components/sections/RentalInfo";
import Moments from "@/components/sections/Moments";
import Seasonal from "@/components/sections/Seasonal";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";

const collectionsHeading = {
  eyebrow: { vi: "Album theo concept", en: "Concept albums" },
  title: { vi: "Mỗi concept, một câu chuyện", en: "Every concept, a story" },
  accent: { vi: "của Lamis.", en: "by Lamis." },
};

// Trang chủ: Hero → Marquee → Về Lamis → Album concept → Dịch vụ → Quy trình → Bảng giá → Portfolio
// → Makeup Academy → Đánh giá → Liên hệ
export default async function HomePage({ params }) {
  const { lang } = await params;
  const site = localize(siteConfig, lang);
  const L = localize(
    {
      hero,
      marquee,
      about,
      featuredCollections,
      services,
      rental,
      moments,
      seasonal,
      reviews,
      contact,
      ui,
      collectionsHeading,
    },
    lang,
  );

  return (
    <>
      <Hero hero={L.hero} ui={L.ui} exploreHref={href(lang, "/bo-suu-tap")} />
      <Marquee items={L.marquee} />
      <About about={L.about} />
      <Collections
        lang={lang}
        collections={L.featuredCollections}
        ui={L.ui}
        heading={L.collectionsHeading}
      />
      <Services lang={lang} services={L.services} ui={L.ui} />
      <Rental rental={L.rental} />
      <RentalInfo rental={L.rental} site={site} ui={L.ui} />
      <Moments
        moments={L.moments}
        ui={L.ui}
        allHref={href(lang, "/bo-suu-tap")}
        collectionsCount={collections.length}
      />
      <Seasonal seasonal={L.seasonal} ui={L.ui} collectionSlug="" />
      <Reviews reviews={L.reviews} site={site} />
      <Contact contact={L.contact} site={site} ui={L.ui} />
    </>
  );
}
