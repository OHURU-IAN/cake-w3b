import Link from "next/link";
import { getPublicCakes } from "@/lib/cakes";
import { siteConfig } from "@/lib/site-config";
import { CakeCard } from "@/components/CakeCard";
import { Reveal } from "@/components/Reveal";
import { Hero3D } from "@/components/three/Hero3D";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const cakes = await getPublicCakes();

  const activeCategory = category && category !== "All" ? category : null;
  const visibleCakes = activeCategory
    ? cakes.filter((c) => c.category === activeCategory)
    : cakes;

  const usedCategories = siteConfig.categories.filter((cat) =>
    cakes.some((c) => c.category === cat),
  );

  const phoneDigits = siteConfig.phone.replace(/\s/g, "");

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="mx-auto grid max-w-6xl items-center gap-6 px-4 pb-8 pt-10 lg:grid-cols-2 lg:gap-4 lg:pt-16">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-berry shadow-sm">
            <span className="bob inline-block">🧁</span> Freshly baked, made to
            order
          </span>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-cocoa sm:text-6xl">
            <span className="bg-gradient-to-br from-berry via-rose to-gold bg-clip-text text-transparent">
              {siteConfig.tagline}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cocoa/80 lg:mx-0">
            {siteConfig.intro}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href="#menu"
              className="shine rounded-full bg-gradient-to-r from-berry to-berry-dark px-7 py-3.5 font-semibold text-cream shadow-xl shadow-berry/30 transition hover:-translate-y-0.5 hover:shadow-berry/50"
            >
              Browse the menu
            </a>
            <a
              href="#order"
              className="glass rounded-full px-7 py-3.5 font-semibold text-berry transition hover:-translate-y-0.5"
            >
              How to order
            </a>
          </div>
        </div>

        {/* Interactive 3D cake */}
        <div className="order-1 lg:order-2">
          <Hero3D />
        </div>
      </section>

      {/* ---------- Menu ---------- */}
      <section id="menu" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-rose">
              The menu
            </span>
            <h2 className="mt-2 text-4xl font-bold text-cocoa">Our cakes</h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-berry to-gold" />
          </div>
        </Reveal>

        {usedCategories.length > 0 && (
          <Reveal delay={80}>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <CategoryChip label="All" href="/#menu" active={!activeCategory} />
              {usedCategories.map((cat) => (
                <CategoryChip
                  key={cat}
                  label={cat}
                  href={`/?category=${encodeURIComponent(cat)}#menu`}
                  active={activeCategory === cat}
                />
              ))}
            </div>
          </Reveal>
        )}

        {visibleCakes.length === 0 ? (
          <div className="glass mx-auto mt-10 max-w-lg rounded-3xl p-10 text-center text-cocoa/70">
            <p className="text-lg">No cakes to show yet.</p>
            <p className="mt-1 text-sm">
              Add your first cake from the{" "}
              <Link href="/admin" className="font-semibold text-berry underline">
                owner login
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCakes.map((cake, i) => (
              <Reveal key={cake.id} delay={(i % 3) * 90}>
                <CakeCard cake={cake} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ---------- How to order ---------- */}
      <section id="order" className="scroll-mt-24 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="glass overflow-hidden rounded-[2rem] p-8 sm:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                <div>
                  <h2 className="text-4xl font-bold text-cocoa">How to order</h2>
                  <p className="mt-4 text-cocoa/80">
                    Found something you love? Get in touch and let&apos;s talk
                    flavours, sizes and dates. Everything is made fresh, so
                    please give as much notice as you can.
                  </p>
                  <p className="mt-3 text-sm text-cocoa/60">
                    📍 {siteConfig.location}
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <ContactCard
                    icon="📞"
                    label="Call or text"
                    value={siteConfig.phone}
                    href={`tel:${phoneDigits}`}
                  />
                  <ContactCard
                    icon="✉️"
                    label="Email"
                    value={siteConfig.email}
                    href={`mailto:${siteConfig.email}`}
                  />
                  {siteConfig.whatsapp && (
                    <ContactCard
                      icon="💬"
                      label="WhatsApp"
                      value="Message us"
                      href={`https://wa.me/${siteConfig.whatsapp}`}
                    />
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CategoryChip({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-full bg-gradient-to-r from-berry to-berry-dark px-5 py-2 text-sm font-semibold text-cream shadow-lg shadow-berry/30"
          : "glass rounded-full px-5 py-2 text-sm font-medium text-cocoa transition hover:-translate-y-0.5 hover:text-berry"
      }
    >
      {label}
    </Link>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="rounded-2xl border border-white/60 bg-white/70 p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-berry/20"
    >
      <p className="text-2xl">{icon}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-rose">
        {label}
      </p>
      <p className="mt-1 font-semibold text-cocoa">{value}</p>
    </a>
  );
}
