"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Pic from "@/components/ui/Pic";
import SplitText from "@/components/fx/SplitText";
import { cn } from "@/lib/utils";

/**
 * FAQ: trái là 2 polaroid xếp lệch (desktop), phải là accordion câu hỏi (mở một mục một lúc).
 */
export default function Faq({ faq }) {
  const [open, setOpen] = useState(0);
  const [big, small] = faq.polaroids;

  return (
    <section className="relative flex items-center overflow-hidden bg-fog py-16 lg:pt-20 lg:pb-24">
      <Container wide>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="relative hidden lg:block">
            <div className="reveal w-[76%] -rotate-3 polaroid" data-reveal="scale">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Pic
                  src={big.src}
                  alt=""
                  fill
                  sizes="30vw"
                  className="object-cover"
                  style={{ objectPosition: big.pos }}
                />
              </div>
              <p className="mt-3 text-center font-serif text-xl text-ink-soft italic">
                {big.caption}
              </p>
            </div>
            <div
              className="reveal absolute right-0 bottom-10 w-[46%] rotate-[6deg] polaroid"
              data-reveal="scale"
              style={{ "--reveal-delay": "150ms" }}
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Pic
                  src={small.src}
                  alt=""
                  fill
                  sizes="20vw"
                  className="object-cover"
                  style={{ objectPosition: small.pos }}
                />
              </div>
              <p className="mt-2 text-center font-serif text-base text-ink-soft italic">
                {small.caption}
              </p>
            </div>
          </div>

          <div>
            <p className="reveal eyebrow">{faq.eyebrow}</p>
            <SplitText
              text={faq.title}
              className="mt-4 h-display text-[2.2rem] sm:text-[2.8rem] lg:text-[3rem]"
            />
            <ul
              className="reveal mt-8 divide-y divide-ink/10 border-y border-ink/10"
              style={{ "--reveal-delay": "200ms" }}
            >
              {faq.items.map((it, i) => {
                const on = open === i;
                return (
                  <li key={it.q}>
                    <button
                      type="button"
                      onClick={() => setOpen(on ? -1 : i)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                      aria-expanded={on}
                    >
                      <span
                        className={cn(
                          "font-serif text-xl transition-colors lg:text-[1.35rem]",
                          on ? "text-ink" : "text-ink/70",
                        )}
                      >
                        {it.q}
                      </span>
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                          on ? "rotate-45 border-ink bg-ink text-white" : "border-ink/15 text-ink",
                        )}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          aria-hidden
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-500",
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="pr-16 pb-5 text-justify text-sm leading-relaxed text-ink-soft">
                          {it.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
