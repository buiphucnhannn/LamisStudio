import { siteConfig } from "@/config/site";
import { collections } from "@/data/site";
import { href } from "@/i18n";

const base = siteConfig.url;

// Mỗi trang 2 bản: tiếng Việt (đường dẫn gốc) & tiếng Anh (đường dẫn tiếng Anh, qua href)
export default function sitemap() {
  const pair = (viPath, priority, changeFrequency = "monthly") => {
    const vi = base + (href("vi", viPath) === "/" ? "" : href("vi", viPath));
    const en = base + href("en", viPath);
    const alternates = { languages: { vi, en } };
    return [
      {
        url: vi || base,
        lastModified: siteConfig.lastUpdated,
        changeFrequency,
        priority,
        alternates,
      },
      {
        url: en,
        lastModified: siteConfig.lastUpdated,
        changeFrequency,
        priority: priority - 0.1,
        alternates,
      },
    ];
  };

  return [
    ...pair("/", 1),
    ...pair("/bo-suu-tap", 0.9, "weekly"),
    ...pair("/dich-vu", 0.9),
    ...collections.flatMap((c) => pair(`/bo-suu-tap/${c.slug}`, 0.8)),
  ];
}
