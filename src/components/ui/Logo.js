import Image from "next/image";
import { cn } from "@/lib/utils";
import { photos } from "@/data/site";

// Logo thật của khách (logo.png tách nền từ logo.jpg bằng `npm run assets`, tỉ lệ 799x350 — 2 dòng "Lamis / Studio").
// light=true: chuyển sang trắng để đặt trên ảnh/nền tối.
export default function Logo({ className = "h-8", light = false, preload = false }) {
  return (
    <span className={cn("relative block aspect-[799/350]", className)}>
      <Image
        src={photos.logo}
        alt="Lamis Studio"
        fill
        sizes="220px"
        preload={preload}
        className={cn(
          "object-contain transition-[filter] duration-500",
          light && "brightness-0 invert",
        )}
      />
    </span>
  );
}
