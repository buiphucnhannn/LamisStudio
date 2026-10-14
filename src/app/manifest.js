import { siteConfig } from "@/config/site";

export default function manifest() {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description.vi,
    start_url: "/",
    display: "standalone",
    background_color: "#f3efe6",
    theme_color: siteConfig.themeColor,
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
