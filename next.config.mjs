import { COLLECTION_SLUGS_EN } from "./src/i18n/routes.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Ẩn nút "N" góc trái khi dev (lỗi compile/runtime vẫn hiện overlay)
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Next 16 bắt buộc khai báo danh sách quality; ảnh studio dùng 90 cho nét
    qualities: [75, 90],
  },
  // Tiếng Việt là mặc định tại "/", tiếng Anh tại "/en" (route thật nằm ở app/[lang])
  async rewrites() {
    return [
      { source: "/", destination: "/vi" },
      { source: "/bo-suu-tap", destination: "/vi/bo-suu-tap" },
      { source: "/bo-suu-tap/:slug", destination: "/vi/bo-suu-tap/:slug" },
      { source: "/dich-vu", destination: "/vi/dich-vu" },
      // Bản tiếng Anh có đường dẫn tiếng Anh (bảng ánh xạ slug: src/i18n/routes.js); route thật dùng chung
      { source: "/en/collections", destination: "/en/bo-suu-tap" },
      { source: "/en/collections/:slug", destination: "/en/bo-suu-tap/:slug" },
      { source: "/en/services", destination: "/en/dich-vu" },
    ];
  },
  // URL tiếng Anh kiểu cũ (/en/bo-suu-tap/...) → URL mới, 308 để link cũ & Google không bị 404.
  async redirects() {
    return [
      { source: "/en/bo-suu-tap", destination: "/en/collections", permanent: true },
      { source: "/en/bo-suu-tap/:slug", destination: "/en/collections/:slug", permanent: true },
      { source: "/en/dich-vu", destination: "/en/services", permanent: true },
      // slug tiếng Việt trên URL tiếng Anh → slug tiếng Anh (vd. /en/collections/han-phuc → /en/collections/hanfu)
      ...Object.entries(COLLECTION_SLUGS_EN)
        .filter(([vi, en]) => vi !== en)
        .map(([vi, en]) => ({
          source: `/en/collections/${vi}`,
          destination: `/en/collections/${en}`,
          permanent: true,
        })),
    ];
  },
};

export default nextConfig;
