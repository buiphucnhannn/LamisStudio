import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/config/site";

/* eslint-disable @next/next/no-img-element -- ImageResponse (Satori) chỉ hỗ trợ <img> thuần */
// Ảnh chia sẻ mạng xã hội: 3 ảnh dọc + logo + tagline (sinh lúc build).
export const alt = "Lamis Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori chỉ đọc được JPEG/PNG → chọn ảnh .jpg trong kho
const PHOTOS = [
  "beauty/beauty-04.jpg",
  "nguyet-ha/nguyet-ha-01.jpg",
  "thanh-xuan/thanh-xuan-01.jpg",
];

export default async function OpengraphImage() {
  const pub = join(process.cwd(), "public", "images");
  const photos = await Promise.all(
    PHOTOS.map(async (p) => `data:image/jpeg;base64,${await readFile(join(pub, p), "base64")}`),
  );
  const logo = `data:image/png;base64,${await readFile(join(pub, "brand", "logo.png"), "base64")}`;

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#141210" }}>
      <div style={{ display: "flex", width: 600, height: "100%" }}>
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            style={{
              width: 200,
              height: 630,
              objectFit: "cover",
              objectPosition: "center 20%",
              opacity: 0.92,
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 600,
          padding: "0 64px",
          color: "#f3efe6",
        }}
      >
        <img src={logo} alt="" style={{ width: 260, filter: "invert(1)" }} />
        <div style={{ fontSize: 30, marginTop: 36, lineHeight: 1.3, color: "#f3efe6" }}>
          {siteConfig.tagline.vi}
        </div>
        <div style={{ fontSize: 20, marginTop: 20, color: "#a8997f" }}>
          Beauty · Chân dung · Concept · Cưới · Makeup
        </div>
      </div>
    </div>,
    size,
  );
}
