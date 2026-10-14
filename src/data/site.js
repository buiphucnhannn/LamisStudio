// ============================================================
// TOÀN BỘ nội dung text / ảnh / album của Lamis Studio.
// Chuỗi song ngữ viết dạng t("tiếng Việt", "English").
// Sửa nội dung tại đây, không cần đụng vào component.
// Mục ghi "CẦN XÁC NHẬN" là nội dung mẫu — hỏi lại khách trước khi bàn giao.
// ============================================================
import { t } from "@/i18n";

// Ảnh giữ nguyên định dạng gốc của khách (webp / jpg)
const WEBP = {
  "an-nhien": "all",
  blossom: "all",
  "thien-than": "all",
  "thanh-xuan": [3, 4, 5],
};
const ext = (group, n) => {
  const w = WEBP[group];
  return w === "all" || (Array.isArray(w) && w.includes(n)) ? "webp" : "jpg";
};
const P = (group, n) => `/images/${group}/${group}-${String(n).padStart(2, "0")}.${ext(group, n)}`;

export { t };

export const photos = {
  logo: "/images/brand/logo.png",
};

// ---------- Điều hướng ----------
export const nav = [
  { label: t("Về Lamis", "About"), href: "/#about" },
  { label: t("Album", "Albums"), href: "/bo-suu-tap" },
  { label: t("Dịch vụ", "Services"), href: "/dich-vu" },
  { label: t("Bảng giá", "Pricing"), href: "/#pricing" },
  { label: t("Liên hệ", "Contact"), href: "/#contact" },
];

export const ui = {
  book: t("Đặt lịch chụp", "Book a shoot"),
  bookFree: t("Đặt lịch tư vấn miễn phí", "Book a free consultation"),
  explore: t("Khám phá album", "Explore albums"),
  viewAll: t("Xem tất cả", "View all"),
  viewAlbum: t("Xem album", "View album"),
  swipe: t("Vuốt ngang để xem thêm →", "Swipe to see more →"),
  hover: t(
    "Rê chuột vào từng cột để khám phá. Mỗi album là một câu chuyện riêng.",
    "Hover each column to explore. Every album tells its own story.",
  ),
  scroll: t("Cuộn", "Scroll"),
  home: t("Trang chủ", "Home"),
  collections: t("Album", "Albums"),
  nextCollection: t("Album tiếp theo", "Next album"),
  aboutCollection: t("Về album", "About this album"),
  bookThis: t("Đặt lịch concept này", "Book this concept"),
  photos: t("ảnh", "photos"),
  closeMenu: t("Đóng menu", "Close menu"),
  openMenu: t("Mở menu", "Open menu"),
  hotline: t("Hotline / Zalo", "Hotline / Zalo"),
  menu: t("Menu", "Menu"),
  contact: t("Liên hệ", "Contact"),
  map: t("Bản đồ", "Map"),
  directions: t("Chỉ đường trên Google Maps", "Get directions on Google Maps"),
  openHours: t("Giờ mở cửa", "Opening hours"),
  toTop: t("Lên đầu trang", "Back to top"),
  all: t("Tất cả", "All"),
  byCountry: t("Theo thể loại", "By genre"),
  byStyle: t("Theo phong cách", "By mood"),
  resetFilters: t("Xoá bộ lọc", "Clear filters"),
  noResults: t("Chưa có album phù hợp với bộ lọc này.", "No album matches these filters yet."),
  notFoundTitle: t("Không tìm thấy trang", "Page not found"),
  notFoundDesc: t(
    "Trang bạn tìm không tồn tại hoặc đã được di chuyển.",
    "The page you are looking for does not exist or has moved.",
  ),
  backHome: t("Về trang chủ", "Back to home"),
  priceContact: t("Từ 690K", "From 690K"),
  album: t("Album", "Album"),
  priceLabel: t("Giá tham khảo", "Starting price"),
  priceValue: t("Từ 690K / buổi", "From 690K / session"),
  seasonalBadge: t("Theo mùa", "Seasonal"),
  callNow: t("Gọi ngay", "Call now"),
  chatMessenger: t("Chat Messenger", "Chat on Messenger"),
  chatZalo: t("Chat Zalo", "Chat on Zalo"),
};

// ---------- Phân loại: thể loại & phong cách ----------
// (giữ tên khoá countries / styles của khung giao diện)
export const countries = {
  beauty: t("Beauty", "Beauty"),
  portrait: t("Chân dung", "Portrait"),
  concept: t("Concept", "Concept"),
  outdoor: t("Ngoại cảnh", "Outdoor"),
};

export const styles = {
  artistic: t("Nghệ thuật", "Fine art"),
  sweet: t("Ngọt ngào", "Sweet"),
  fashion: t("Thời trang", "Fashion"),
  natural: t("Tự nhiên", "Natural"),
  heritage: t("Nét Việt", "Vietnamese"),
};

//   = khoảng trắng không ngắt dòng: giữ từ ghép tiếng Việt đi liền nhau.
// ---------- Album (6 bộ, dùng đủ 43 ảnh trong kho) ----------
// pos = objectPosition; ảnh chân dung dọc thường cần "center 20–30%" để không cắt mặt.
export const collections = [
  {
    slug: "an-nhien",
    name: t("An Nhiên", "Serenity"),
    sub: t("Chân dung · Nghệ thuật", "Portrait · Fine art"),
    country: "portrait",
    style: "artistic",
    price: t("Từ 690K / buổi", "From 690K / session"), // CẦN XÁC NHẬN
    concept: t("Chân dung thiền, lụa nâu, ánh nến", "Zen portrait, amber silk, candlelight"),
    desc: t(
      "Ánh sáng ấm như ngọn nến, sắc nâu trầm của lụa và làn khói trầm mỏng — An Nhiên là bộ chân dung tĩnh lặng, nơi vẻ đẹp đến từ sự bình yên bên trong. Dành cho ai yêu nét Á Đông và muốn một bộ ảnh sâu lắng, giàu tính nghệ thuật.",
      "Candle-warm light, deep amber silk and a thin veil of incense smoke — Serenity is a quiet portrait series where beauty comes from inner calm. For those who love Asian elegance and want an artistic, soulful set.",
    ),
    cover: P("an-nhien", 4),
    coverPos: "center 25%",
    hero: { src: P("an-nhien", 3), pos: "center 20%" },
    images: [
      { src: P("an-nhien", 1), pos: "center 30%" },
      { src: P("an-nhien", 2), pos: "center 30%" },
      { src: P("an-nhien", 3), pos: "center 20%" },
      { src: P("an-nhien", 4), pos: "center 25%" },
      { src: P("an-nhien", 5), pos: "center 30%" },
      { src: P("an-nhien", 6), pos: "center 30%" },
      { src: P("an-nhien", 7), pos: "center 25%" },
      { src: P("an-nhien", 8), pos: "center 30%" },
      { src: P("an-nhien", 9), pos: "center 30%" },
    ],
  },
  {
    slug: "blossom",
    name: t("Blossom", "Blossom"),
    sub: t("Concept · Sinh nhật", "Concept · Birthday"),
    country: "concept",
    style: "sweet",
    price: t("Từ 1.290K / buổi", "From 1,290K / session"), // CẦN XÁC NHẬN
    concept: t("Hoa hồng phấn, bánh kem, vương miện", "Pink roses, birthday cake, tiara"),
    desc: t(
      "Đoá hồng phấn khổng lồ, chiếc bánh kem đính vương miện và những tông hồng pastel dịu ngọt. Blossom là món quà sinh nhật dành tặng chính mình — nữ tính, trong trẻo và đầy nâng niu.",
      "A giant bouquet of pink roses, a tiara-topped cake and soft pastel tones. Blossom is a birthday gift to yourself — feminine, fresh and tenderly styled.",
    ),
    cover: P("blossom", 7),
    coverPos: "center 30%",
    hero: { src: P("blossom", 4), pos: "center 30%" },
    images: [
      { src: P("blossom", 1), pos: "center 30%" },
      { src: P("blossom", 2), pos: "center 30%" },
      { src: P("blossom", 3), pos: "center 30%" },
      { src: P("blossom", 4), pos: "center", wide: true },
      { src: P("blossom", 5), pos: "center 25%" },
      { src: P("blossom", 6), pos: "center 25%" },
      { src: P("blossom", 7), pos: "center 25%" },
      { src: P("blossom", 8), pos: "center 20%" },
      { src: P("blossom", 9), pos: "center", wide: true },
      { src: P("blossom", 10), pos: "center 30%" },
      { src: P("blossom", 11), pos: "center 30%" },
      { src: P("blossom", 12), pos: "center 20%" },
      { src: P("blossom", 13), pos: "center 30%" },
      { src: P("blossom", 14), pos: "center 25%" },
      { src: P("blossom", 15), pos: "center 30%" },
    ],
  },
  {
    slug: "thien-than",
    name: t("Thiên Thần", "Angel"),
    sub: t("Concept · Thời trang", "Concept · Fashion"),
    country: "concept",
    style: "fashion",
    price: t("Từ 1.290K / buổi", "From 1,290K / session"), // CẦN XÁC NHẬN
    concept: t("Đôi cánh lông vũ, ren trắng, nền băng", "Feather wings, white lace, icy backdrop"),
    desc: t(
      "Đôi cánh lông vũ trắng muốt, ren mỏng và phông nền xanh băng. Thiên Thần mang đến hình ảnh thuần khiết nhưng vẫn cá tính — một concept thời trang cho cô gái muốn thử điều khác biệt.",
      "Snow-white feather wings, delicate lace and an icy blue backdrop. Angel is pure yet bold — a fashion concept for girls who want to try something different.",
    ),
    cover: P("thien-than", 2),
    coverPos: "center 25%",
    hero: { src: P("thien-than", 4), pos: "center 25%" },
    images: [
      { src: P("thien-than", 1), pos: "center 25%" },
      { src: P("thien-than", 2), pos: "center 25%" },
      { src: P("thien-than", 3), pos: "center 20%" },
      { src: P("thien-than", 4), pos: "center 25%" },
    ],
  },
  {
    slug: "beauty",
    name: t("Beauty Muse", "Beauty Muse"),
    sub: t("Beauty · Makeup", "Beauty · Makeup"),
    country: "beauty",
    style: "fashion",
    price: t("Từ 690K / buổi", "From 690K / session"), // CẦN XÁC NHẬN
    concept: t("Beauty cận mặt, makeup trong trẻo", "Close-up beauty, fresh makeup"),
    desc: t(
      "Ống kính cận mặt tôn từng đường nét: làn da căng bóng, ánh mắt trong veo, má hồng và đôi môi mọng. Beauty Muse là nơi tay nghề makeup và ánh sáng studio cùng toả sáng.",
      "Close-up lenses that celebrate every feature: dewy skin, clear eyes, rosy cheeks and soft lips. Beauty Muse is where makeup artistry and studio light shine together.",
    ),
    cover: P("beauty", 4),
    coverPos: "center 30%",
    hero: { src: P("beauty", 2), pos: "center 30%" },
    images: [
      { src: P("beauty", 1), pos: "center 30%" },
      { src: P("beauty", 2), pos: "center 30%" },
      { src: P("beauty", 3), pos: "center 35%" },
      { src: P("beauty", 4), pos: "center 30%" },
    ],
  },
  {
    slug: "thanh-xuan",
    name: t("Thanh Xuân", "Youth"),
    sub: t("Ngoại cảnh · Áo dài", "Outdoor · Áo dài"),
    country: "outdoor",
    style: "natural",
    price: t("Từ 990K / buổi", "From 990K / session"), // CẦN XÁC NHẬN
    concept: t("Áo dài trắng, sân trường, nắng chiều", "White áo dài, schoolyard, afternoon sun"),
    desc: t(
      "Tà áo dài trắng, sân trường đầy nắng và chiếc máy ảnh nhỏ trên tay. Thanh Xuân lưu lại tuổi học trò hồn nhiên bằng ánh sáng tự nhiên — trong trẻo, mộc mạc mà thật nhiều cảm xúc.",
      "White áo dài, a sunlit schoolyard and a little camera in hand. Youth keeps your school days in natural light — fresh, simple and full of feeling.",
    ),
    cover: P("thanh-xuan", 5),
    coverPos: "center 25%",
    hero: { src: P("thanh-xuan", 6), pos: "center 25%" },
    images: [
      { src: P("thanh-xuan", 1), pos: "center 30%" },
      { src: P("thanh-xuan", 2), pos: "center 30%" },
      { src: P("thanh-xuan", 3), pos: "center 30%" },
      { src: P("thanh-xuan", 4), pos: "center 25%" },
      { src: P("thanh-xuan", 5), pos: "center 25%" },
      { src: P("thanh-xuan", 6), pos: "center 25%" },
    ],
  },
  {
    slug: "nguyet-ha",
    name: t("Nguyệt Hạ", "Moonlight"),
    sub: t("Concept · Trung Thu", "Concept · Mid-Autumn"),
    country: "concept",
    style: "heritage",
    price: t("Từ 1.290K / buổi", "From 1,290K / session"), // CẦN XÁC NHẬN
    seasonal: true,
    concept: t("Yếm gấm, đèn ông sao, đầu lân", "Brocade yếm, star lanterns, lion dance"),
    desc: t(
      "Sắc đỏ lụa là, đèn ông sao, đầu lân và chiếc yếm gấm cổ điển. Nguyệt Hạ tái hiện không khí Trung Thu xưa rộn ràng — rực rỡ, đậm chất Việt và rất riêng.",
      "Red silk, star lanterns, a lion-dance head and a classic brocade yếm. Moonlight recreates the joyful Mid-Autumn of old — vivid, deeply Vietnamese and one of a kind.",
    ),
    cover: P("nguyet-ha", 1),
    coverPos: "center 30%",
    hero: { src: P("nguyet-ha", 3), pos: "center 25%" },
    images: [
      { src: P("nguyet-ha", 1), pos: "center 30%" },
      { src: P("nguyet-ha", 2), pos: "center 30%" },
      { src: P("nguyet-ha", 3), pos: "center 25%" },
      { src: P("nguyet-ha", 4), pos: "center 30%" },
      { src: P("nguyet-ha", 5), pos: "center 40%" },
    ],
  },
];

export const getCollection = (slug) => collections.find((c) => c.slug === slug);
export const featuredCollections = [
  "an-nhien",
  "blossom",
  "thien-than",
  "beauty",
  "thanh-xuan",
  "nguyet-ha",
].map(getCollection);

// ---------- Hero ----------
export const hero = {
  eyebrow: t(
    "Lamis Studio · Photo & Makeup · TP. Vinh",
    "Lamis Studio · Photo & Makeup · Vinh City",
  ),
  title: t("Lưu giữ vẻ đẹp", "Capture the beauty"),
  accent: t("của riêng bạn.", "that is yours."),
  desc: t(
    "Chụp ảnh beauty, chân dung, concept, ngoại cảnh và phóng sự cưới — cùng makeup chuyên nghiệp và đào tạo trang điểm ngay tại TP. Vinh.",
    "Beauty, portrait, concept, outdoor and wedding photography — with professional makeup and makeup classes in Vinh City.",
  ),
  // 3 cột ảnh dọc (desktop), mỗi cột xoay vòng lệch nhịp — mỗi cột dùng album riêng để không trùng mẫu
  columns: [
    [
      { src: P("blossom", 7), pos: "center 25%" },
      { src: P("thanh-xuan", 5), pos: "center 25%" },
      { src: P("blossom", 15), pos: "center 30%" },
    ],
    [
      { src: P("an-nhien", 4), pos: "center 25%" },
      { src: P("nguyet-ha", 1), pos: "center 30%" },
      { src: P("an-nhien", 3), pos: "center 20%" },
    ],
    [
      { src: P("beauty", 2), pos: "center 30%" },
      { src: P("thien-than", 2), pos: "center 25%" },
      { src: P("beauty", 4), pos: "center 30%" },
    ],
  ],
  badges: [
    t(
      "Beauty · Chân dung · Concept · Ngoại cảnh · Cưới",
      "Beauty · Portrait · Concept · Outdoor · Wedding",
    ),
    t("Makeup & đào tạo trang điểm", "Makeup & makeup classes"),
    t("Studio tại TP. Vinh, Nghệ An", "Studio in Vinh City, Nghe An"),
  ],
};

// ---------- Dải chữ chạy ----------
export const marquee = [
  t("Chụp ảnh beauty", "Beauty shoots"),
  t("Chân dung", "Portraits"),
  t("Concept", "Concept"),
  t("Ngoại cảnh", "Outdoor"),
  t("Phóng sự cưới", "Wedding stories"),
  t("Makeup", "Makeup"),
  t("Đào tạo trang điểm", "Makeup classes"),
  t("Kỷ yếu", "Graduation"),
  t("Sinh nhật", "Birthday"),
];

// ---------- Về Lamis ----------
export const about = {
  eyebrow: t("Về Lamis", "About Lamis"),
  manifesto: [
    { text: t("Mỗi người phụ nữ", "Every woman") },
    { text: t("đều mang", "carries") },
    { text: t("một vẻ đẹp", "a beauty") },
    { text: t("rất riêng.", "all her own."), accent: true },
  ],
  paragraphs: [
    t(
      "Lamis Studio là không gian chụp ảnh và trang điểm tại TP. Vinh: beauty, chân dung, concept, ngoại cảnh và phóng sự cưới — theo đuổi phong cách tối giản, sang trọng và giàu tính nghệ thuật.",
      "Lamis Studio is a photography and makeup space in Vinh City: beauty, portrait, concept, outdoor and wedding stories — in a minimal, elegant and artistic style.",
    ),
    t(
      "Bạn chỉ cần đến — Lamis lo phần còn lại: tư vấn concept, trang phục, makeup, làm tóc, hướng dẫn tạo dáng và hậu kỳ tỉ mỉ cho từng khung hình.",
      "Just show up — Lamis takes care of the rest: concept, outfits, makeup, hair, posing guidance and careful retouching for every frame.",
    ),
  ],
  main: { src: P("an-nhien", 3), pos: "center 20%" },
  polaroids: [
    { src: P("thanh-xuan", 1), caption: "school days", pos: "center 25%" },
    { src: P("blossom", 12), caption: "birthday bloom", pos: "center 20%", square: true },
  ],
  highlights: [
    { value: "06", label: t("Dòng dịch vụ", "Services") },
    { value: "06", label: t("Album concept", "Concept albums") },
    { value: "1:1", label: t("Makeup riêng mỗi buổi", "Personal makeup artist") },
  ],
};

// ---------- Dịch vụ (6 mục theo brief) ----------
export const services = {
  eyebrow: t("Dịch vụ", "Services"),
  title: t("Từ makeup đến khung hình.", "From makeup to frame."),
  desc: t(
    "Rê chuột vào từng dịch vụ để xem hình minh hoạ. Mọi gói đều có makeup và tư vấn concept.",
    "Hover each service to preview. Every package includes makeup and concept advice.",
  ),
  items: [
    {
      n: "01",
      title: t("Chụp ảnh beauty", "Beauty photography"),
      desc: t(
        "Cận mặt với ánh sáng studio chuẩn beauty, makeup tôn nét — da mịn, ánh mắt trong veo.",
        "Close-ups in true beauty lighting with makeup that flatters — smooth skin, clear eyes.",
      ),
      image: P("beauty", 2),
      pos: "center 30%",
      collection: "beauty",
    },
    {
      n: "02",
      title: t("Chụp chân dung", "Portrait photography"),
      desc: t(
        "Chân dung cá nhân, nghệ thuật hay profile — khai thác thần thái và câu chuyện của bạn.",
        "Personal, fine-art or profile portraits — drawing out your presence and story.",
      ),
      image: P("an-nhien", 2),
      pos: "center 30%",
      collection: "an-nhien",
    },
    {
      n: "03",
      title: t("Chụp ảnh concept", "Concept photography"),
      desc: t(
        "Sinh nhật, thiên thần, Trung Thu… lên ý tưởng trọn gói: bối cảnh, trang phục, đạo cụ.",
        "Birthday, angel, Mid-Autumn… fully styled: set, outfits and props.",
      ),
      image: P("blossom", 6),
      pos: "center 25%",
      collection: "blossom",
    },
    {
      n: "04",
      title: t("Chụp ngoại cảnh", "Outdoor photography"),
      desc: t(
        "Kỷ yếu, áo dài, dạo phố — nắng tự nhiên và không gian thật cho khoảnh khắc sống động.",
        "Graduation, áo dài, city strolls — natural light and real places for lively moments.",
      ),
      image: P("thanh-xuan", 4),
      pos: "center 25%",
      collection: "thanh-xuan",
    },
    {
      n: "05",
      title: t("Phóng sự cưới", "Wedding stories"),
      desc: t(
        "Ghi lại trọn ngày trọng đại: lễ gia tiên, tiệc cưới và khoảnh khắc tự nhiên của cô dâu – chú rể.",
        "Your whole big day: family rites, the reception and natural moments of the couple.",
      ),
      image: P("thanh-xuan", 3),
      pos: "center 35%",
    },
    {
      n: "06",
      title: t("Makeup & đào tạo trang điểm", "Makeup & makeup classes"),
      desc: t(
        "Makeup cô dâu, sự kiện, chụp ảnh và các khoá học từ cá nhân đến chuyên nghiệp.",
        "Bridal, event and photo makeup, plus classes from personal to professional.",
      ),
      image: P("beauty", 1),
      pos: "center 30%",
    },
  ],
};

// ---------- Quy trình (4 bước) + bảng giá / giờ mở cửa ----------
export const rental = {
  eyebrow: t("Quy trình", "How it works"),
  title: t("Bốn bước cho một bộ ảnh đẹp.", "Four steps to a beautiful set."),
  // Nguồn DUY NHẤT cho các bước — dùng ở trang chủ (Quy trình) và trang Dịch vụ (Hành trình)
  steps: [
    {
      n: "01",
      title: t("Tư vấn & chọn concept", "Consult & choose a concept"),
      desc: t(
        "Nhắn Lamis mong muốn, dịp chụp và số người — Lamis gợi ý concept, trang phục và giữ lịch cho bạn.",
        "Tell Lamis your wishes, occasion and group size — we suggest a concept and outfits and hold your slot.",
      ),
      image: P("blossom", 1),
      pos: "center 30%",
    },
    {
      n: "02",
      title: t("Makeup & làm tóc", "Makeup & hair"),
      desc: t(
        "Chuyên viên makeup tạo layout riêng, tôn đường nét và hợp concept trước khi lên hình.",
        "Our makeup artist creates a look that flatters your features and suits the concept.",
      ),
      image: P("beauty", 3),
      pos: "center 30%",
    },
    {
      n: "03",
      title: t("Buổi chụp", "The shoot"),
      desc: t(
        "Nhiếp ảnh gia hướng dẫn tạo dáng tận tình trong studio hoặc ngoại cảnh — bạn chỉ cần thả lỏng.",
        "Our photographer guides every pose in studio or outdoors — you just relax.",
      ),
      image: P("an-nhien", 6),
      pos: "center 30%",
    },
    {
      n: "04",
      title: t("Hậu kỳ & trao ảnh", "Retouch & delivery"),
      desc: t(
        "Chọn ảnh, chỉnh sửa tỉ mỉ theo tông màu Lamis và gửi file chất lượng cao cho bạn.",
        "Pick your favourites; we retouch them in the Lamis tone and send high-resolution files.",
      ),
      image: P("nguyet-ha", 3),
      pos: "center 25%",
    },
  ],
  priceTitle: t("Bảng giá tham khảo", "Starting prices"),
  priceNote: t(
    "Giá thay đổi theo concept, số trang phục và số người. Nhắn Lamis để nhận báo giá chi tiết.",
    "Prices vary with the concept, outfits and group size. Message Lamis for a detailed quote.",
  ),
  // Bảng giá tham khảo — CẦN XÁC NHẬN toàn bộ giá với khách
  prices: [
    { name: t("Beauty / Chân dung", "Beauty / Portrait"), price: t("từ 690K", "from 690K") },
    { name: t("Concept trọn gói", "Full concept"), price: t("từ 1.290K", "from 1,290K") },
    { name: t("Ngoại cảnh", "Outdoor"), price: t("từ 990K", "from 990K") },
    { name: t("Phóng sự cưới", "Wedding story"), price: t("từ 4.990K", "from 4,990K") },
    { name: t("Makeup sự kiện", "Event makeup"), price: t("từ 350K", "from 350K") },
  ],
  pickup: t(
    "Studio tại TP. Vinh, Nghệ An. Nhắn trước để Lamis chuẩn bị trang phục, makeup và phòng chụp cho bạn.",
    "Our studio is in Vinh City, Nghe An. Message us first so Lamis can prepare outfits, makeup and the set for you.",
  ),
  // Nền ảnh ghép cho section bảng giá (2 hàng trôi ngược chiều) — ảnh đa dạng, ít trùng section khác
  collage: [
    { src: P("an-nhien", 1), pos: "center 30%" },
    { src: P("blossom", 2), pos: "center 30%" },
    { src: P("thien-than", 1), pos: "center 25%" },
    { src: P("nguyet-ha", 2), pos: "center 30%" },
    { src: P("thanh-xuan", 2), pos: "center 30%" },
    { src: P("blossom", 10), pos: "center 30%" },
    { src: P("an-nhien", 7), pos: "center 25%" },
    { src: P("beauty", 3), pos: "center 35%" },
    { src: P("blossom", 5), pos: "center 25%" },
    { src: P("an-nhien", 8), pos: "center 30%" },
    { src: P("thien-than", 3), pos: "center 20%" },
    { src: P("blossom", 13), pos: "center 30%" },
    { src: P("nguyet-ha", 4), pos: "center 30%" },
    { src: P("thanh-xuan", 6), pos: "center 25%" },
    { src: P("blossom", 8), pos: "center 20%" },
    { src: P("an-nhien", 9), pos: "center 30%" },
  ],
  perks: [
    t("Makeup & làm tóc đi kèm", "Makeup & hair included"),
    t("Trang phục theo concept", "Concept outfits"),
    t("Hậu kỳ tỉ mỉ", "Careful retouching"),
  ],
};

// ---------- Portfolio (dải ngang) ----------
export const moments = {
  eyebrow: t("Portfolio", "Portfolio"),
  title: t("Những khung hình đã được lưu giữ.", "Frames we have kept forever."),
  hint: t(
    "Cuộn tiếp để lướt qua những bộ ảnh thực tế chụp tại Lamis",
    "Keep scrolling to browse real shoots at Lamis",
  ),
  items: [
    { src: P("blossom", 3), size: "tall", caption: t("Hồng phấn", "Blush pink") },
    { src: P("an-nhien", 5), size: "square", caption: t("Ánh nến", "Candlelight") },
    { src: P("thien-than", 4), size: "tall", caption: t("Đôi cánh", "Wings") },
    { src: P("thanh-xuan", 4), size: "tall", caption: t("Áo dài trắng", "White áo dài") },
    { src: P("beauty", 1), size: "square", caption: t("Beauty cận mặt", "Close-up beauty") },
    { src: P("nguyet-ha", 5), size: "tall", caption: t("Đêm Trung Thu", "Mid-Autumn night") },
    { src: P("blossom", 14), size: "tall", caption: t("Sinh nhật", "Birthday") },
    { src: P("an-nhien", 2), size: "square", caption: t("Tĩnh lặng", "Stillness") },
    { src: P("thanh-xuan", 2), size: "tall", caption: t("Tuổi học trò", "School days") },
    { src: P("blossom", 9), size: "square", caption: t("Vương miện", "Tiara") },
    { src: P("thien-than", 3), size: "tall", caption: t("Thuần khiết", "Pure") },
    { src: P("nguyet-ha", 4), size: "tall", caption: t("Nét Việt", "Vietnamese spirit") },
  ],
};

// ---------- Makeup & đào tạo trang điểm (khối nổi bật nền tối) ----------
export const seasonal = {
  eyebrow: t("Lamis Makeup Academy", "Lamis Makeup Academy"),
  title: t(
    "Makeup & đào tạo trang điểm — đẹp từ chính đôi tay bạn.",
    "Makeup & makeup classes — beauty from your own hands.",
  ),
  desc: t(
    "Makeup cô dâu, sự kiện, chụp ảnh và các khoá học từ cá nhân đến chuyên nghiệp: thực hành trên mẫu thật, học theo lộ trình riêng. Nhắn Lamis để nhận lịch khai giảng gần nhất.",
    "Bridal, event and photo makeup, plus classes from personal to professional: hands-on practice with real models and a personal learning path. Message Lamis for the next intake.",
  ),
  cta: t("Đăng ký tư vấn khoá học", "Ask about classes"),
  posters: [
    P("beauty", 1),
    P("blossom", 12),
    P("beauty", 3),
    P("an-nhien", 3),
    P("thien-than", 4),
    P("beauty", 2),
    P("nguyet-ha", 3),
    P("blossom", 13),
    P("beauty", 4),
    P("thanh-xuan", 4),
    P("blossom", 7),
    P("an-nhien", 4),
  ],
};

// ---------- Đánh giá khách hàng ----------
// CẦN XÁC NHẬN: thay bằng đánh giá thật (Google Maps / Facebook)
export const reviews = {
  eyebrow: t("Đánh giá khách hàng", "Reviews"),
  title: t("Điều khách hàng nói về Lamis.", "What our guests say about Lamis."),
  rating: "5.0",
  ratingNote: t("trên Google & Facebook", "on Google & Facebook"),
  more: t("Xem trên Facebook", "See on Facebook"),
  items: [
    {
      quote: t(
        "Lần đầu chụp concept sinh nhật mà mê từng tấm. Makeup nhẹ nhàng, chị chụp hướng dẫn tạo dáng rất có tâm, ảnh trả nhanh lại đẹp hơn mong đợi.",
        "My first birthday concept shoot and I love every frame. Gentle makeup, patient posing guidance, and the photos came back fast and better than expected.",
      ),
      name: "Ngọc Anh",
      service: t("Concept Blossom", "Blossom concept"),
      avatar: { src: P("blossom", 12), pos: "center 20%" },
    },
    {
      quote: t(
        "Bộ ảnh An Nhiên đúng như mình tưởng tượng: trầm, ấm và rất nghệ thuật. Studio sạch đẹp, tư vấn trang phục kỹ càng.",
        "The Serenity set was exactly what I imagined: calm, warm and artistic. A clean, lovely studio and thoughtful outfit advice.",
      ),
      name: "Thu Hà",
      service: t("Chân dung nghệ thuật", "Fine-art portrait"),
      avatar: { src: P("an-nhien", 3), pos: "center 20%" },
    },
    {
      quote: t(
        "Makeup tự nhiên mà lên ảnh cực xinh. Mình đăng ký luôn khoá makeup cá nhân để tự đánh đi làm hằng ngày.",
        "Natural makeup that looks stunning on camera. I signed up for the personal makeup class right away.",
      ),
      name: "Minh Châu",
      service: t("Beauty & Makeup", "Beauty & makeup"),
      avatar: { src: P("beauty", 2), pos: "center 25%" },
    },
    {
      quote: t(
        "Chụp kỷ yếu áo dài cùng lớp, các anh chị vui tính, nhiệt tình, ảnh màu trong veo. Cả lớp đều ưng!",
        "We shot our class graduation in áo dài — a fun, kind team and crystal-clear colours. The whole class loved it!",
      ),
      name: "Khánh Linh",
      service: t("Ngoại cảnh Thanh Xuân", "Youth outdoor"),
      avatar: { src: P("thanh-xuan", 5), pos: "center 20%" },
    },
    {
      quote: t(
        "Concept Trung Thu rực rỡ mà vẫn tinh tế, đạo cụ đầy đủ. Ảnh đăng lên ai cũng hỏi chụp ở đâu.",
        "The Mid-Autumn concept was vivid yet refined, with every prop ready. Everyone asked where I took the photos.",
      ),
      name: "Phương Thảo",
      service: t("Concept Nguyệt Hạ", "Moonlight concept"),
      avatar: { src: P("nguyet-ha", 1), pos: "center 25%" },
    },
  ],
};

// ---------- Liên hệ (khối mời gọi cuối trang) ----------
export const contact = {
  script: t("Hẹn gặp bạn ở Lamis", "See you at Lamis"),
  eyebrow: t("Liên hệ & đặt lịch", "Contact & booking"),
  title: t("Sẵn sàng toả sáng cùng Lamis?", "Ready to shine with Lamis?"),
  desc: t(
    "Nhắn Lamis qua Zalo hoặc Messenger, gọi điện hay ghé thẳng studio — Lamis tư vấn concept phù hợp và giữ lịch cho bạn.",
    "Message Lamis on Zalo or Messenger, call, or drop by the studio — we'll suggest the right concept and hold your slot.",
  ),
  polaroids: [
    { src: P("blossom", 11), caption: "blossom", pos: "center 30%" },
    { src: P("thien-than", 1), caption: "angel", pos: "center 25%" },
    { src: P("an-nhien", 4), caption: "serenity", pos: "center 25%" },
    { src: P("nguyet-ha", 2), caption: "moonlight", pos: "center 30%", square: true },
  ],
};

// ---------- Popup đặt lịch ----------
export const booking = {
  title: t("Đặt lịch tư vấn & chụp ảnh", "Book a consultation & shoot"),
  desc: t(
    "Để lại thông tin, Lamis sẽ liên hệ xác nhận lịch và tư vấn concept phù hợp trong ngày.",
    "Leave your details and Lamis will confirm your slot and suggest a concept within the day.",
  ),
  // căn phải: giữ trọn watermark "LAMIS" ở góc phải trên ảnh (cột ảnh hẹp hơn ảnh → cắt bớt bên trái)
  image: { src: P("blossom", 11), pos: "100% 30%" },
  // "\n" = ngắt dòng có chủ đích (hiển thị bằng whitespace-pre-line)
  headline: t("Đến là có makeup,\ncó concept, có ảnh đẹp.", "Just show up —\nwe handle the rest."),
  bullets: [
    t("Tư vấn concept & trang phục miễn phí", "Free concept & outfit advice"),
    t("Makeup & làm tóc đi kèm mọi gói chụp", "Makeup & hair with every package"),
    t("Hậu kỳ tỉ mỉ, trả ảnh nhanh", "Careful retouching, fast delivery"),
  ],
  fields: {
    name: t("Họ tên", "Full name"),
    phone: t("Số điện thoại / Zalo", "Phone / Zalo"),
    date: t("Ngày muốn chụp", "Shoot date"),
    people: t("Số người", "Group size"),
    collection: t("Concept quan tâm", "Concept of interest"),
    note: t(
      "Ghi chú (dịch vụ: beauty, cưới, makeup, học trang điểm…)",
      "Notes (service: beauty, wedding, makeup, classes…)",
    ),
    undecided: t("Chưa quyết định, cần tư vấn", "Not sure yet, need advice"),
    submit: t("Gửi qua Messenger", "Send via Messenger"),
    submitZalo: t("Gửi qua Zalo", "Send via Zalo"),
    or: t("Hoặc liên hệ nhanh:", "Or contact directly:"),
    copied: t(
      "Đã sao chép nội dung — dán vào khung chat nhé!",
      "Message copied — paste it in the chat!",
    ),
    privacy: t(
      "Lamis chỉ dùng thông tin này để xác nhận lịch chụp.",
      "Lamis only uses this information to confirm your booking.",
    ),
  },
  // nội dung tin nhắn soạn sẵn
  message: t(
    "Xin chào Lamis Studio, mình muốn đặt lịch chụp ảnh:",
    "Hello Lamis Studio, I'd like to book a shoot:",
  ),
};

// ---------- Trang Dịch vụ (/dich-vu) ----------
export const servicesPage = {
  meta: {
    title: t("Dịch vụ", "Services"),
    desc: t(
      "Dịch vụ của Lamis Studio TP. Vinh: chụp ảnh beauty, chân dung, concept, ngoại cảnh, phóng sự cưới; makeup và đào tạo trang điểm. Bảng giá tham khảo.",
      "Lamis Studio Vinh services: beauty, portrait, concept, outdoor and wedding photography; makeup and makeup classes. Starting prices.",
    ),
  },
  hero: {
    eyebrow: t("Dịch vụ của Lamis", "Lamis services"),
    title: t("Một buổi hẹn,", "One appointment,"),
    accent: t("trọn vẹn khung hình.", "a complete look."),
    desc: t(
      "Từ tư vấn concept, makeup, làm tóc đến hướng dẫn tạo dáng và hậu kỳ — Lamis chuẩn bị mọi thứ để bạn chỉ việc toả sáng và tận hưởng.",
      "From concept and makeup to hair, posing and retouching — Lamis prepares everything so you can simply shine and enjoy.",
    ),
    ctaSecondary: t("Xem các dịch vụ", "See all services"),
    script: t("trọn vẹn từng chi tiết", "every detail, covered"),
    images: [
      { src: P("blossom", 6), pos: "center 25%" },
      { src: P("an-nhien", 5), pos: "center 30%" },
      { src: P("beauty", 4), pos: "center 30%" },
    ],
    stats: [
      { value: "06", label: t("Dòng dịch vụ", "Services") },
      { value: "06", label: t("Album concept", "Concept albums") },
      { value: "1:1", label: t("Makeup riêng mỗi buổi", "Personal makeup artist") },
    ],
  },
  journey: {
    eyebrow: t("Hành trình", "The journey"),
    title: t("Bốn bước, một bộ ảnh đẹp.", "Four steps, one beautiful set."),
    hint: t("Rê chuột vào từng bước để xem chi tiết.", "Hover each step to see details."),
    steps: rental.steps, // dùng chung với section Quy trình ở trang chủ
  },
  list: {
    eyebrow: t("Dịch vụ chính", "Main services"),
    title: t(
      "Sáu dịch vụ Lamis chuẩn bị cho vẻ đẹp của bạn.",
      "Six services Lamis prepares for your beauty.",
    ),
    book: t("Đặt lịch dịch vụ này", "Book this service"),
    consult: t("Tư vấn ngay", "Ask us"),
    viewCollection: t("Xem album", "View album"),
    items: [
      {
        n: "01",
        sub: t("Beauty", "Beauty"),
        title: t("Chụp ảnh beauty", "Beauty photography"),
        desc: t(
          "Ống kính cận mặt cùng ánh sáng studio chuẩn beauty và layout makeup tôn nét — cho bộ ảnh da mịn tự nhiên, ánh mắt trong veo, đủ đẹp để làm ảnh đại diện hay kỷ niệm tuổi trẻ.",
          "Close-up lenses, true beauty lighting and a flattering makeup look — for naturally smooth skin and clear eyes, lovely as a profile picture or a keepsake.",
        ),
        points: [
          t("Makeup & làm tóc theo layout beauty", "Beauty makeup & hair"),
          t("Ánh sáng studio chuẩn beauty", "True beauty studio lighting"),
          t("Giá tham khảo: từ 690K / buổi", "Starting at 690K / session"),
        ],
        image: P("beauty", 4),
        pos: "center 30%",
        collection: "beauty",
      },
      {
        n: "02",
        sub: t("Chân dung", "Portrait"),
        title: t("Chụp chân dung", "Portrait photography"),
        desc: t(
          "Chân dung cá nhân, nghệ thuật hay profile công việc — nhiếp ảnh gia khai thác thần thái và câu chuyện riêng của bạn qua ánh sáng, bối cảnh và trang phục.",
          "Personal, fine-art or professional profile portraits — our photographer draws out your presence and story through light, set and wardrobe.",
        ),
        points: [
          t("Chân dung nghệ thuật · profile", "Fine-art · profile portraits"),
          t("Hướng dẫn tạo dáng tận tình", "Patient posing guidance"),
          t("Giá tham khảo: từ 690K / buổi", "Starting at 690K / session"),
        ],
        image: P("an-nhien", 9),
        pos: "center 30%",
        collection: "an-nhien",
      },
      {
        n: "03",
        sub: t("Concept", "Concept"),
        title: t("Chụp ảnh concept", "Concept photography"),
        desc: t(
          "Sinh nhật hồng phấn, thiên thần cánh trắng hay Trung Thu nét Việt — mỗi concept được dàn dựng trọn gói từ bối cảnh, trang phục đến đạo cụ.",
          "Pink birthdays, white-winged angels or a Vietnamese Mid-Autumn — every concept is fully styled, from set and outfits to props.",
        ),
        points: [
          t("Bối cảnh, trang phục, đạo cụ có sẵn", "Set, outfits and props ready"),
          t("Gói 2 concept – 2 trang phục", "2 concepts – 2 outfits package"),
          t("Giá tham khảo: từ 1.290K / buổi", "Starting at 1,290K / session"),
        ],
        image: P("thien-than", 2),
        pos: "center 25%",
        collection: "thien-than",
      },
      {
        n: "04",
        sub: t("Ngoại cảnh", "Outdoor"),
        title: t("Chụp ngoại cảnh", "Outdoor photography"),
        desc: t(
          "Kỷ yếu, áo dài, dạo phố — tận dụng nắng tự nhiên và không gian thật quanh TP. Vinh để lưu lại những khoảnh khắc hồn nhiên, sống động.",
          "Graduation, áo dài, city strolls — natural light and real places around Vinh for candid, lively moments.",
        ),
        points: [
          t("Chụp tại 1 – 2 địa điểm", "1 – 2 locations"),
          t("Nhận chụp nhóm, lớp kỷ yếu", "Groups & graduation classes"),
          t("Giá tham khảo: từ 990K / buổi", "Starting at 990K / session"),
        ],
        image: P("thanh-xuan", 6),
        pos: "center 25%",
        collection: "thanh-xuan",
      },
      {
        n: "05",
        sub: t("Cưới", "Wedding"),
        title: t("Phóng sự cưới", "Wedding stories"),
        desc: t(
          "Ghi lại trọn vẹn ngày trọng đại theo phong cách phóng sự: lễ gia tiên, rước dâu, tiệc cưới và những khoảnh khắc tự nhiên, cảm xúc nhất của cô dâu – chú rể.",
          "Your whole big day in documentary style: family rites, the procession, the reception and the most natural, emotional moments of the couple.",
        ),
        points: [
          t("Lễ gia tiên · rước dâu · tiệc cưới", "Family rites · procession · reception"),
          t("Makeup cô dâu đi kèm", "Bridal makeup available"),
          t("Giá tham khảo: từ 4.990K", "Starting at 4,990K"),
        ],
        image: P("thanh-xuan", 3),
        pos: "center 35%",
      },
      {
        n: "06",
        sub: t("Makeup Academy", "Makeup Academy"),
        title: t("Makeup & đào tạo trang điểm", "Makeup & makeup classes"),
        desc: t(
          "Makeup cô dâu, sự kiện, chụp ảnh — và các khoá học từ tự trang điểm cá nhân đến makeup chuyên nghiệp, thực hành trên mẫu thật theo lộ trình riêng.",
          "Bridal, event and photo makeup — plus classes from personal self-makeup to professional artistry, with hands-on practice on real models.",
        ),
        points: [
          t("Makeup cô dâu · sự kiện · chụp ảnh", "Bridal · event · photo makeup"),
          t("Khoá cá nhân & chuyên nghiệp", "Personal & professional classes"),
          t("Giá tham khảo: makeup từ 350K", "Makeup starting at 350K"),
        ],
        image: P("beauty", 1),
        pos: "center 30%",
      },
    ],
  },
  faq: {
    eyebrow: t("Câu hỏi thường gặp", "FAQ"),
    title: t("Những điều bạn hay hỏi Lamis.", "What people often ask Lamis."),
    polaroids: [
      { src: P("blossom", 14), caption: "ask us anything", pos: "center 20%" },
      { src: P("thanh-xuan", 1), caption: "school days", pos: "center 25%" },
    ],
    items: [
      {
        q: t("Có cần đặt lịch trước không?", "Do I need to book in advance?"),
        a: t(
          "Nên đặt trước 2–3 ngày để Lamis chuẩn bị concept, trang phục và sắp lịch makeup — nhất là cuối tuần, mùa kỷ yếu và mùa cưới.",
          "Booking 2–3 days ahead lets Lamis prepare the concept, outfits and makeup — especially on weekends, graduation and wedding seasons.",
        ),
      },
      {
        q: t("Giá đã bao gồm makeup và trang phục chưa?", "Do prices include makeup and outfits?"),
        a: t(
          "Các gói chụp đã gồm makeup, làm tóc và trang phục theo concept. Giá thay đổi theo số concept, số trang phục và số người — nhắn Lamis để nhận báo giá chi tiết.",
          "Packages include makeup, hair and concept outfits. Prices vary with the number of concepts, outfits and people — message Lamis for a detailed quote.",
        ),
      },
      {
        q: t("Bao lâu thì nhận được ảnh?", "When will I get my photos?"),
        a: t(
          "Bạn nhận file gốc ngay sau buổi chụp để chọn ảnh; ảnh hậu kỳ được gửi sau vài ngày tuỳ số lượng. Lamis sẽ báo thời gian cụ thể khi chốt lịch.",
          "You receive the originals right after the shoot to choose from; retouched photos follow within a few days depending on quantity. Lamis confirms the exact timing when booking.",
        ),
      },
      {
        q: t("Lamis có chụp ngoại cảnh và cưới không?", "Do you shoot outdoors and weddings?"),
        a: t(
          "Có. Lamis nhận chụp ngoại cảnh, kỷ yếu và phóng sự cưới tại TP. Vinh và các khu vực lân cận theo lịch hẹn.",
          "Yes. Lamis shoots outdoors, graduations and wedding stories in Vinh City and nearby areas by appointment.",
        ),
      },
      {
        q: t("Khoá học trang điểm học như thế nào?", "How do the makeup classes work?"),
        a: t(
          "Có khoá makeup cá nhân (tự trang điểm hằng ngày) và khoá chuyên nghiệp (beauty, cô dâu, sự kiện), thực hành trên mẫu thật. Nhắn Lamis để nhận lộ trình và lịch khai giảng.",
          "There are personal (everyday self-makeup) and professional (beauty, bridal, event) classes with hands-on practice. Message Lamis for the syllabus and next intake.",
        ),
      },
    ],
  },
  cta: {
    script: t("Hẹn gặp bạn ở Lamis", "See you at Lamis"),
    title: t("Sẵn sàng cho bộ ảnh của riêng bạn?", "Ready for a set that is truly yours?"),
    desc: t(
      "Để lại thông tin, Lamis sẽ tư vấn concept và giữ lịch cho bạn trong ngày.",
      "Leave your details and Lamis will suggest a concept and hold your slot within the day.",
    ),
    zalo: t("Nhắn Zalo", "Message on Zalo"),
    bg: [
      { src: P("blossom", 15), pos: "center 30%" },
      { src: P("an-nhien", 7), pos: "center 25%" },
      { src: P("thien-than", 2), pos: "center 25%" },
    ],
  },
};

// ---------- Trang Album ----------
export const collectionsPage = {
  title: t("Album concept của", "Concept albums by"),
  accent: t("Lamis.", "Lamis."),
  desc: t(
    "Phân loại theo thể loại và phong cách. Chọn album để xem trọn bộ ảnh, rồi đặt lịch chụp ngay trên trang.",
    "Sorted by genre and mood. Open an album to see the full set, then book directly from the page.",
  ),
  ctaScript: t("Chưa biết chọn concept nào?", "Not sure which concept?"),
  ctaTitle: t("Để Lamis gợi ý cho bạn.", "Let Lamis suggest for you."),
  ctaDesc: t(
    "Kể Lamis nghe về dịp chụp, phong cách bạn thích hay số người — Lamis sẽ chọn concept hợp nhất.",
    "Tell Lamis about the occasion, the style you love or your group — we'll pick the best fit.",
  ),
  ctaBg: [
    { src: P("blossom", 6), pos: "center 25%" },
    { src: P("an-nhien", 5), pos: "center 30%" },
    { src: P("nguyet-ha", 4), pos: "center 30%" },
  ],
};

// ---------- Footer ----------
export const footer = {
  blurb: t(
    "Studio chụp ảnh & makeup tại TP. Vinh — tối giản, sang trọng, tập trung vào hình ảnh.",
    "Photo & makeup studio in Vinh City — minimal, elegant and image-focused.",
  ),
  rights: t("Bảo lưu mọi quyền.", "All rights reserved."),
};
