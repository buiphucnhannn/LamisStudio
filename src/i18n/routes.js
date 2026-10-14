/**
 * Đường dẫn song ngữ: bản tiếng Việt dùng đường dẫn gốc ("/bo-suu-tap/an-nhien"),
 * bản tiếng Anh có đường dẫn & slug tiếng Anh riêng ("/en/collections/serenity").
 *
 * - Trong code LUÔN viết đường dẫn tiếng Việt và đi qua href(lang, path) → tự dịch sang tiếng Anh.
 * - Route thật vẫn là app/[lang]/bo-suu-tap/[slug] & app/[lang]/dich-vu; next.config.mjs rewrite
 *   URL tiếng Anh về route này (và redirect 308 URL tiếng Anh kiểu cũ /en/bo-suu-tap/... sang URL mới).
 * - Thêm album mới: thêm 1 dòng vào COLLECTION_SLUGS_EN.
 */

// đoạn đường dẫn: vi → en
export const SEGMENTS_EN = {
  "bo-suu-tap": "collections",
  "dich-vu": "services",
};

// slug album: vi → en
export const COLLECTION_SLUGS_EN = {
  "an-nhien": "serenity",
  blossom: "blossom",
  "thien-than": "angel",
  beauty: "beauty-muse",
  "thanh-xuan": "youth",
  "nguyet-ha": "moonlight",
};

const invert = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [v, k]));
const SEGMENTS_VI = invert(SEGMENTS_EN);
const COLLECTION_SLUGS_VI = invert(COLLECTION_SLUGS_EN);

export const collectionSlugEn = (viSlug) => COLLECTION_SLUGS_EN[viSlug] ?? viSlug;
export const collectionSlugVi = (slug) => COLLECTION_SLUGS_VI[slug] ?? slug;

// "/bo-suu-tap/an-nhien#x" → "/collections/serenity#x" (chưa gồm tiền tố /en)
export function toEnPath(viPath) {
  const [path, hash = ""] = viPath.split("#");
  const parts = path.split("/").map((seg, i, arr) => {
    if (i === 1) return SEGMENTS_EN[seg] ?? seg;
    if (i === 2 && arr[1] === "bo-suu-tap") return collectionSlugEn(seg);
    return seg;
  });
  return parts.join("/") + (hash ? `#${hash}` : "");
}

// "/collections/serenity" → "/bo-suu-tap/an-nhien" (đường dẫn sau khi bỏ tiền tố /en)
export function toViPath(enPath) {
  const [path, hash = ""] = enPath.split("#");
  const parts = path.split("/").map((seg, i, arr) => {
    if (i === 1) return SEGMENTS_VI[seg] ?? seg;
    if (i === 2 && (arr[1] === "collections" || arr[1] === "bo-suu-tap"))
      return collectionSlugVi(seg);
    return seg;
  });
  return parts.join("/") + (hash ? `#${hash}` : "");
}
