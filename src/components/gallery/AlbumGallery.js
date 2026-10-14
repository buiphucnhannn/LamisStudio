"use client";

import { useState } from "react";
import Pic from "@/components/ui/Pic";
import Lightbox from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

/**
 * Lưới ảnh album: mọi ô cùng khung 4:5 (2 cột mobile, 3 cột từ md) — hàng cuối lẻ ảnh tự căn giữa
 * nhờ flex-wrap + justify-center. Ảnh ngang/vuông được cắt theo `pos`; xem trọn ảnh trong lightbox.
 * images: [{src, alt, pos}]
 */
export default function AlbumGallery({ images, name }) {
  const [idx, setIdx] = useState(null);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setIdx(i)}
            className={cn(
              "group reveal relative block aspect-[4/5] overflow-hidden rounded-xl bg-fog-200",
              "w-[calc((100%-0.75rem)/2)] md:w-[calc((100%-1.5rem)/3)] lg:w-[calc((100%-2rem)/3)]",
            )}
            style={{ "--reveal-delay": `${(i % 3) * 80}ms` }}
            aria-label={`${name} ${i + 1}`}
          >
            <Pic
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ objectPosition: img.pos }}
            />
            <span className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/15" />
            <span className="absolute right-3 bottom-3 rounded-full bg-white/80 px-2 py-0.5 text-[11px] tracking-widest text-ink opacity-0 backdrop-blur transition group-hover:opacity-100 lg:text-[10px]">
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
      <Lightbox images={images} index={idx} onClose={() => setIdx(null)} onChange={setIdx} />
    </>
  );
}
