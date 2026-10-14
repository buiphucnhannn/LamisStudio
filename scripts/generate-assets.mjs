/**
 * Sinh asset thương hiệu từ logo gốc của khách (public/images/brand/logo.jpg — chữ đen trên nền kem):
 *   - public/images/brand/logo.png              logo tách nền (đen, trong suốt) — header/footer/preloader
 *   - src/app/favicon.ico, icon.png, apple-icon.png  — monogram "L"
 *
 * Chạy: npm run assets   (chạy lại mỗi khi đổi logo)
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const pub = (...p) => path.join(root, "public", ...p);
const app = (...p) => path.join(root, "src", "app", ...p);

const CREAM = "#f3efe6";
const INK = "#141210";

/** Tìm khung bao vùng có điểm ảnh tối (chữ) trong mask xám. */
function bbox(data, w, h, x0 = 0, x1 = w, y0 = 0, y1 = h, min = 40) {
  let minx = w,
    miny = h,
    maxx = -1,
    maxy = -1;
  for (let y = y0; y < y1; y++)
    for (let x = x0; x < x1; x++)
      if (data[y * w + x] > min) {
        if (x < minx) minx = x;
        if (x > maxx) maxx = x;
        if (y < miny) miny = y;
        if (y > maxy) maxy = y;
      }
  return { left: minx, top: miny, width: maxx - minx + 1, height: maxy - miny + 1 };
}

/** Mask: chữ = trắng (255), nền = đen (0); kéo tương phản để mép chữ sắc. */
async function inkMask(input) {
  const { data, info } = await sharp(input)
    .greyscale()
    .negate()
    .linear(1.6, -60)
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

/** Ghép màu đặc + alpha mask → PNG trong suốt. */
const tint = (mask, w, h, color) =>
  sharp({ create: { width: w, height: h, channels: 3, background: color } })
    .joinChannel(mask, { raw: { width: w, height: h, channels: 1 } })
    .png();

async function main() {
  await mkdir(pub("images", "brand"), { recursive: true });

  // ---------- Logo tách nền ----------
  const src = pub("images", "brand", "logo.jpg");
  const full = await inkMask(src);
  const box = bbox(full.data, full.w, full.h);
  const pad = 8;
  const crop = {
    left: box.left - pad,
    top: box.top - pad,
    width: box.width + pad * 2,
    height: box.height + pad * 2,
  };
  const logoMask = await sharp(src)
    .extract(crop)
    .greyscale()
    .negate()
    .linear(1.6, -60)
    .raw()
    .toBuffer();
  await tint(logoMask, crop.width, crop.height, INK).toFile(pub("images", "brand", "logo.png"));
  console.log(`logo.png ${crop.width}x${crop.height}`);

  // ---------- Monogram "L" (ký tự đầu của logo) ----------
  // Dò cột trống đầu tiên trong dòng chữ "Lamis" để tách riêng chữ L.
  const word = { y0: box.top, y1: box.top + Math.round(box.height * 0.7) };
  let x = box.left;
  const colHasInk = (cx) => {
    for (let y = word.y0; y < word.y1; y++) if (full.data[y * full.w + cx] > 40) return true;
    return false;
  };
  while (x < box.left + box.width && colHasInk(x)) x++;
  const L = bbox(full.data, full.w, full.h, box.left, x, word.y0, word.y1);
  const glyph = await sharp(src).extract(L).greyscale().negate().linear(1.6, -60).png().toBuffer();

  const monogram = async (size, { bg = INK, fg = CREAM, scale = 0.5, radius = 0.22 } = {}) => {
    const gh = Math.round(size * scale);
    // extractChannel(0): đảm bảo mask đúng 1 kênh trước khi ghép làm alpha
    const resized = await sharp(glyph)
      .resize({ height: gh })
      .extractChannel(0)
      .raw()
      .toBuffer({ resolveWithObject: true });
    const glyphPng = await tint(
      resized.data,
      resized.info.width,
      resized.info.height,
      fg,
    ).toBuffer();
    const r = Math.round(size * radius);
    const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${bg}"/></svg>`;
    return sharp(Buffer.from(bgSvg))
      .composite([{ input: glyphPng, gravity: "center" }])
      .png()
      .toBuffer();
  };

  await writeFile(app("icon.png"), await monogram(512));
  await writeFile(app("apple-icon.png"), await monogram(180, { radius: 0 }));

  // favicon.ico: gói nhiều PNG vào 1 file ICO
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((s) => monogram(s, { scale: 0.62 })));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = 6 + sizes.length * 16;
  const entries = sizes.map((s, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(s, 0);
    e.writeUInt8(s, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(pngs[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += pngs[i].length;
    return e;
  });
  await writeFile(app("favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));

  // Ảnh chia sẻ (Open Graph) do src/app/opengraph-image.js tự sinh lúc build — không tạo ở đây.

  console.log("✔ Assets generated");
}

main();
