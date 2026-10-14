# Lamis Studio — Website

Website studio chụp ảnh & makeup **Lamis Studio** (TP. Vinh, Nghệ An), song ngữ Việt / Anh.
Khung giao diện dùng lại 100% từ dự án ButStudio (bố cục, khoảng cách, hiệu ứng); nội dung, hình ảnh và
bảng màu (kem – be – trắng – đen) theo hồ sơ yêu cầu `docs/demo.docx`.

**Stack:** Next.js 16 (App Router) · Tailwind CSS v4 · JavaScript thuần · Lenis (cuộn mượt)

## Chạy dự án

```bash
npm install
cp .env.example .env.local   # đặt NEXT_PUBLIC_SITE_URL = tên miền thật
npm run dev                  # http://localhost:3000  (tiếng Anh: /en)
```

| Lệnh             | Mô tả                                                                   |
| ---------------- | ----------------------------------------------------------------------- |
| `npm run dev`    | Môi trường phát triển                                                   |
| `npm run build`  | Build production                                                        |
| `npm run lint`   | Kiểm tra code                                                           |
| `npm run format` | Định dạng code (Prettier + sắp xếp class Tailwind)                      |
| `npm run assets` | Sinh lại logo tách nền, favicon, icon từ `public/images/brand/logo.jpg` |

## Trang

- **Trang chủ** `/` — Hero → Dải chữ chạy → Về Lamis → Album concept → Dịch vụ → Quy trình →
  Bảng giá tham khảo (`#pricing`) → Portfolio → Makeup Academy → Đánh giá khách hàng → Liên hệ.
- **Album** `/bo-suu-tap` — 6 album, lọc theo thể loại & phong cách; chi tiết `/bo-suu-tap/<slug>`.
- **Dịch vụ** `/dich-vu` — 6 dịch vụ kèm giá tham khảo, hành trình 4 bước, bảng giá, FAQ.
- Bản tiếng Anh: `/en`, `/en/collections`, `/en/services`.
- **Đặt lịch:** popup dùng chung — mọi phần tử có `data-booking` khi bấm sẽ mở popup
  (giá trị = slug album để chọn sẵn concept).
- Footer có Google Maps; nút nổi Messenger / Zalo / Gọi.

## Chỉnh nội dung

- **Mọi chữ, giá, ảnh:** `src/data/site.js` (song ngữ dạng `t("tiếng Việt", "English")`).
- **Thông tin liên hệ, giờ mở cửa, bản đồ, SEO:** `src/config/site.js`.
- Mục ghi `CẦN XÁC NHẬN` là nội dung mẫu cần hỏi lại khách: địa chỉ chi tiết / link Google Maps,
  giờ mở cửa, bảng giá, đánh giá khách hàng, link Instagram.
- **Ảnh:** `public/images/<album>/<album>-NN.(jpg|webp)`; ảnh webp khai báo trong `WEBP` ở đầu `site.js`.
- **Thêm album:** thêm vào `collections` (site.js) + 1 dòng slug tiếng Anh trong `src/i18n/routes.js`.
- **Màu:** khối `@theme` trong `src/app/globals.css` (tên class `fog/ash/ink/accent` giữ như khung gốc,
  giá trị đã đổi sang tông kem – be).
