import { t } from "@/i18n";

/**
 * Thông tin thương hiệu, liên hệ, SEO — theo brief docs/demo.docx.
 * Mục ghi "CẦN XÁC NHẬN" là nội dung mẫu, cần hỏi lại khách trước khi bàn giao.
 */
const FACEBOOK_ID = "61560429930142";
const MAP_QUERY = "Lamis Studio Vinh Nghệ An"; // CẦN XÁC NHẬN: thay bằng địa chỉ / link Google Maps chính xác

export const siteConfig = {
  name: "Lamis Studio",
  shortName: "Lamis",
  tagline: t("Photo Studio & Makeup tại TP. Vinh", "Photo Studio & Makeup in Vinh City"),
  description: t(
    "Lamis Studio TP. Vinh — chụp ảnh beauty, chân dung, concept, ngoại cảnh, phóng sự cưới; makeup và đào tạo trang điểm. Phong cách tối giản, sang trọng, tập trung vào hình ảnh.",
    "Lamis Studio, Vinh City — beauty, portrait, concept, outdoor and wedding photography; makeup and makeup classes. Minimal, elegant and image-focused.",
  ),
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  lastUpdated: "2026-10-14",
  themeColor: "#f3efe6",
  keywords: [
    "Lamis Studio",
    "studio chụp ảnh Vinh",
    "chụp ảnh beauty Vinh",
    "chụp ảnh concept Vinh",
    "chụp chân dung Nghệ An",
    "phóng sự cưới Vinh",
    "makeup Vinh",
    "học trang điểm Vinh",
  ],

  phone: "034 616 1908",
  phoneRaw: "0346161908",
  zalo: "https://zalo.me/0346161908",
  facebook: `https://www.facebook.com/profile.php?id=${FACEBOOK_ID}`,
  messenger: `https://m.me/${FACEBOOK_ID}`,
  instagram: "https://www.instagram.com/", // CẦN XÁC NHẬN: link Instagram chính thức (nếu có)
  mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`,
  mapsEmbed: `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=15&hl=vi&output=embed`,

  address: t("TP. Vinh, Nghệ An", "Vinh City, Nghe An"), // CẦN XÁC NHẬN: số nhà, tên đường
  addressShort: t("TP. Vinh, Nghệ An", "Vinh City, Nghe An"),
  geo: { lat: 18.6796, lng: 105.6813 }, // trung tâm TP. Vinh — CẦN XÁC NHẬN toạ độ studio

  // Giờ hoạt động — CẦN XÁC NHẬN
  hours: [
    { days: t("Thứ 2 – Chủ nhật", "Monday – Sunday"), time: "08:00 – 20:00" },
    {
      days: t("Ngoại cảnh & cưới", "Outdoor & weddings"),
      time: t("Theo lịch hẹn", "By appointment"),
    },
  ],
  hoursShort: t("Mở cửa hằng ngày từ 08:00", "Open daily from 08:00"),
  openingHoursSchema: ["Mo-Su 08:00-20:00"],
};
