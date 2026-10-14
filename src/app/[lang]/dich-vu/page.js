import { siteConfig } from "@/config/site";
import { localize, href, isLocale } from "@/i18n";
import { servicesPage, rental, ui } from "@/data/site";
import ServicesHero from "@/components/services/ServicesHero";
import Journey from "@/components/services/Journey";
import ServiceList from "@/components/services/ServiceList";
import RentalInfo from "@/components/sections/RentalInfo";
import Faq from "@/components/services/Faq";
import ServicesCta from "@/components/services/ServicesCta";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = localize(servicesPage, lang);
  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      canonical: href(lang, "/dich-vu"),
      languages: { vi: href("vi", "/dich-vu"), en: href("en", "/dich-vu") },
    },
  };
}

/**
 * Trang Dịch vụ riêng (lấy ý tưởng từ trang Dịch vụ của MUSE Bridal, chuyển theo brief Lamis Studio):
 * Hero (chữ + 3 ảnh so le) → Hành trình 4 bước (nền tối) → 6 dịch vụ (zig-zag)
 * → Bảng giá tham khảo / giờ mở cửa / liên hệ (dùng lại RentalInfo) → FAQ → CTA.
 * Section Dịch vụ ở trang chủ giữ nguyên; mọi link "Dịch vụ" trên menu/footer trỏ về trang này.
 */
export default async function ServicesPage({ params }) {
  const { lang } = await params;
  const site = localize(siteConfig, lang);
  const L = localize({ servicesPage, rental, ui }, lang);
  const p = L.servicesPage;

  return (
    <>
      <ServicesHero hero={p.hero} ui={L.ui} />
      <Journey journey={p.journey} />
      <ServiceList lang={lang} list={p.list} />
      <RentalInfo rental={L.rental} site={site} ui={L.ui} />
      <Faq faq={p.faq} />
      <ServicesCta cta={p.cta} site={site} ui={L.ui} />
    </>
  );
}
