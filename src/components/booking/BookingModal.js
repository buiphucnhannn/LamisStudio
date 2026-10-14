"use client";

import { useCallback, useEffect, useState } from "react";
import Pic from "@/components/ui/Pic";
import Logo from "@/components/ui/Logo";
import BookingForm from "./BookingForm";
import { Check, Close, Messenger, Phone, Zalo } from "@/components/ui/Icons";
import { lockScroll } from "@/lib/utils";

/**
 * Popup đặt lịch thuê dùng chung toàn site.
 * Mở bằng bất kỳ phần tử nào có thuộc tính data-booking (giá trị tuỳ chọn = slug bộ sưu tập để chọn sẵn).
 */
export default function BookingModal({ booking, collections, site }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState("");

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest("[data-booking]");
      if (!el) return;
      e.preventDefault();
      setPreset(el.getAttribute("data-booking") || "");
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, close]);

  if (!open) return null;

  const quick = [
    { href: site.messenger, label: "Messenger", Icon: Messenger, ext: true },
    { href: site.zalo, label: "Zalo", Icon: Zalo, ext: true },
    { href: `tel:${site.phoneRaw}`, label: site.phone, Icon: Phone },
  ];

  return (
    <div
      className="fixed inset-0 z-[150] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={booking.title}
    >
      <div
        className="absolute inset-0 [animation:fadeIn_.4s_ease-out_both] bg-ink/70 backdrop-blur-sm"
        onClick={close}
      />

      <div className="relative grid max-h-[92svh] w-full max-w-[980px] [animation:popIn_.55s_cubic-bezier(.22,1,.36,1)_both] overflow-hidden rounded-t-[1.75rem] bg-fog shadow-soft sm:rounded-[1.75rem] lg:grid-cols-[0.42fr_0.58fr] lg:rounded-[2rem]">
        {/* Cột ảnh (desktop) */}
        <div className="relative hidden lg:block">
          <Pic
            src={booking.image.src}
            alt=""
            fill
            sizes="420px"
            className="object-cover"
            style={{ objectPosition: booking.image.pos }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/10" />
          <div className="absolute inset-x-0 bottom-0 px-8 pt-8 pb-12 text-white">
            <p className="font-serif text-[1.7rem] leading-tight whitespace-pre-line">
              {booking.headline}
            </p>
            <ul className="mt-4 space-y-2">
              {booking.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[13px] text-white/85">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-light" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cột form */}
        {/* data-lenis-prevent: cuộn mượt toàn trang (Lenis) không chặn cuộn bên trong popup.
            max-h phải đặt ở CHÍNH cột cuộn: hàng grid cao theo nội dung nên nếu chỉ khung ngoài có max-h
            thì phần thừa bị cắt mất (overflow-hidden) thay vì cuộn được — màn hình thấp / zoom lớn. */}
        <div
          data-lenis-prevent
          className="relative no-scrollbar max-h-[92svh] overflow-y-auto overscroll-contain px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-9 sm:pt-6 sm:pb-6"
        >
          {/* mobile: thanh kéo của bottom sheet */}
          <span
            aria-hidden
            className="mx-auto mb-4 block h-1 w-10 rounded-full bg-ink/15 sm:hidden"
          />
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition hover:bg-ink/5 hover:text-ink sm:top-4 sm:right-4"
          >
            <Close className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <Logo className="h-9 sm:h-10" />
            <h3 className="mt-2 font-serif text-[1.65rem] leading-tight text-ink sm:mt-3 sm:text-[2rem]">
              {booking.title}
            </h3>
            <p className="mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-balance text-ink-soft">
              {booking.desc}
            </p>
          </div>

          <div className="mt-5">
            <BookingForm booking={booking} collections={collections} site={site} preset={preset} />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-ink/10 pt-4 text-[12px] text-ink-muted">
            <span>{booking.fields.or}</span>
            {quick.map(({ href, label, Icon, ext }) => (
              <a
                key={label}
                href={href}
                target={ext ? "_blank" : undefined}
                rel={ext ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 text-ink/80 transition hover:text-ink"
              >
                <Icon className="h-4 w-4" /> {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
