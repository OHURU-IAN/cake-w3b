import Link from "next/link";
import { getPublicCakes } from "@/lib/cakes";
import { siteConfig } from "@/lib/site-config";
import { CakeCard } from "@/components/CakeCard";

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

  // Only show category chips that actually have cakes.
  const usedCategories = siteConfig.categories.filter((cat) =>
    cakes.some((c) => c.category === cat),
  );

  const phoneDigits = siteConfig.phone.replace(/\s/g, "");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blush to-cream">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
          <h1 className="text-4xl font-bold text-berry sm:text-5xl">
            {siteConfig.tagline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-cocoa/80">
            {siteConfig.intro}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#menu"
              className="rounded-full bg-berry px-6 py-3 font-semibold text-cream hover:bg-berry-dark"
            >
              Browse the menu
            </a>
            <a
              href="#order"
              className="rounded-full border border-berry px-6 py-3 font-semibold text-berry hover:bg-blush"
            >
              How to order
            </a>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-3xl font-bold text-cocoa">Our cakes</h2>

        {/* Category filter */}
        {usedCategories.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
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
        )}

        {/* Grid */}
        {visibleCakes.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-rose/50 bg-white/60 p-10 text-center text-cocoa/70">
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
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCakes.map((cake) => (
              <CakeCard key={cake.id} cake={cake} />
            ))}
          </div>
        )}
      </section>

      {/* How to order */}
      <section id="order" className="bg-blush/40">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-3xl font-bold text-cocoa">How to order</h2>
          <p className="mt-3 max-w-2xl text-cocoa/80">
            Found something you love? Get in touch and let&apos;s talk flavours,
            sizes and dates. Orders are made fresh, so please give as much notice
            as you can.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <ContactCard
              label="Call or text"
              value={siteConfig.phone}
              href={`tel:${phoneDigits}`}
            />
            <ContactCard
              label="Email"
              value={siteConfig.email}
              href={`mailto:${siteConfig.email}`}
            />
            {siteConfig.whatsapp && (
              <ContactCard
                label="WhatsApp"
                value="Message us"
                href={`https://wa.me/${siteConfig.whatsapp}`}
              />
            )}
          </div>
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
          ? "rounded-full bg-berry px-4 py-2 text-sm font-medium text-cream"
          : "rounded-full border border-rose/40 bg-white px-4 py-2 text-sm font-medium text-cocoa hover:border-berry hover:text-berry"
      }
    >
      {label}
    </Link>
  );
}

function ContactCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="rounded-2xl border border-blush bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-rose">
        {label}
      </p>
      <p className="mt-1 font-semibold text-cocoa">{value}</p>
    </a>
  );
}
