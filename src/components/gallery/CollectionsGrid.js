"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Pic from "@/components/ui/Pic";
import { cn } from "@/lib/utils";
import { href } from "@/i18n";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * Lưới bộ sưu tập có bộ lọc theo quốc gia và phong cách (yêu cầu brief).
 * countries / styles: { key: label } đã localize.
 */
export default function CollectionsGrid({ lang, collections, countries, styles, ui }) {
  const [country, setCountry] = useState("all");
  const [style, setStyle] = useState("all");

  const list = useMemo(
    () =>
      collections.filter(
        (c) =>
          (country === "all" || c.country === country) && (style === "all" || c.style === style),
      ),
    [collections, country, style],
  );

  const usedCountries = Object.keys(countries).filter((k) =>
    collections.some((c) => c.country === k),
  );
  const usedStyles = Object.keys(styles).filter((k) => collections.some((c) => c.style === k));

  const chip = (key, on, onClick, label) => (
    <button
      key={key}
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-all duration-300",
        on
          ? "border-ink bg-ink text-white"
          : "border-ink/15 bg-white text-ink/70 hover:border-ink/40 hover:text-ink",
      )}
    >
      {label}
    </button>
  );

  // Mỗi nhóm lọc = 1 hàng: nhãn cột trái cố định (2 hàng thẳng cột), "Tất cả" + 5 lựa chọn bên phải.
  // Mobile: nhãn nằm trên, các nút cuộn ngang 1 dòng (không rớt dòng lẻ tẻ).
  const filterRow = (label, options, value, setValue, labels) => (
    <div className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 lg:flex-row lg:items-center lg:gap-6">
      <span className="shrink-0 text-[11px] tracking-[0.25em] whitespace-nowrap text-ink-muted uppercase lg:w-44">
        {label}
      </span>
      <div className="-mx-5 no-scrollbar flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
        {chip("all", value === "all", () => setValue("all"), ui.all)}
        {options.map((k) => chip(k, value === k, () => setValue(k), labels[k]))}
      </div>
    </div>
  );

  const filtered = country !== "all" || style !== "all";
  const reset = () => {
    setCountry("all");
    setStyle("all");
  };

  return (
    <>
      <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="divide-y divide-ink/10">
          {filterRow(ui.byCountry, usedCountries, country, setCountry, countries)}
          {filterRow(ui.byStyle, usedStyles, style, setStyle, styles)}
        </div>
        <p className="flex shrink-0 items-baseline gap-2 text-sm text-ink-muted">
          <span className="font-serif text-3xl text-ink">
            {String(list.length).padStart(2, "0")}
          </span>
          {ui.collections.toLowerCase()}
          {filtered && (
            <button
              type="button"
              onClick={reset}
              className="ml-2 text-[13px] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              {ui.resetFilters}
            </button>
          )}
        </p>
      </div>

      {list.length === 0 && (
        <div className="mt-8 rounded-[1.5rem] border border-dashed border-ink/15 px-6 py-16 text-center">
          <p className="font-serif text-2xl text-ink">{ui.noResults}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-graphite"
          >
            {ui.resetFilters}
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c, i) => (
          <Link
            key={c.slug}
            href={href(lang, `/bo-suu-tap/${c.slug}`)}
            className="group relative block aspect-[4/5] [animation:popIn_.6s_cubic-bezier(.22,1,.36,1)_both] overflow-hidden rounded-[1.5rem] bg-fog-200"
            style={{ animationDelay: `${(i % 3) * 80}ms` }}
          >
            <Pic
              src={c.cover}
              alt={c.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              style={{ objectPosition: c.coverPos }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
            <span className="absolute top-5 left-5 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium tracking-wider text-ink backdrop-blur lg:text-[10px]">
              {c.images.length} {ui.photos}
            </span>
            {c.seasonal && (
              <span className="absolute top-5 right-5 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-medium tracking-wider text-white backdrop-blur lg:text-[10px]">
                {ui.seasonalBadge}
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div>
                <p className="text-[11px] tracking-[0.3em] text-white/70 uppercase lg:text-[10px]">
                  {c.sub}
                </p>
                <h2 className="mt-2 font-serif text-3xl text-white">{c.name}</h2>
                <p className="mt-1 text-sm text-white/75">{c.concept}</p>
              </div>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-all group-hover:bg-white group-hover:text-ink">
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
