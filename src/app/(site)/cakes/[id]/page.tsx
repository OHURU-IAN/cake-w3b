import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCake } from "@/lib/cakes";
import { siteConfig } from "@/lib/site-config";
import { CakeImage } from "@/components/CakeCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cake = await getCake(id);
  if (!cake) return { title: "Cake not found" };
  return {
    title: cake.name,
    description: cake.description || siteConfig.intro,
  };
}

export default async function CakeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cake = await getCake(id);

  if (!cake || !cake.available) {
    notFound();
  }

  const phoneDigits = siteConfig.phone.replace(/\s/g, "");
  const enquiry = encodeURIComponent(
    `Hi ${siteConfig.name}, I'd love to order the "${cake.name}". Could you tell me more?`,
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/#menu" className="text-sm text-berry hover:underline">
        ← Back to the menu
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-blush bg-white">
          <CakeImage
            src={cake.imageUrl}
            alt={cake.name}
            className="aspect-square h-full w-full"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium uppercase tracking-wide text-rose">
            {cake.category}
          </span>
          <h1 className="mt-1 text-4xl font-bold text-cocoa">{cake.name}</h1>
          {cake.price && (
            <p className="mt-3 text-2xl font-bold text-berry">{cake.price}</p>
          )}
          {cake.description && (
            <p className="mt-5 whitespace-pre-line leading-relaxed text-cocoa/80">
              {cake.description}
            </p>
          )}

          <div className="mt-auto pt-8">
            <p className="mb-3 font-semibold text-cocoa">
              Like the look of this one?
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${phoneDigits}`}
                className="rounded-full bg-berry px-6 py-3 font-semibold text-cream hover:bg-berry-dark"
              >
                Call to order
              </a>
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                  `Order enquiry: ${cake.name}`,
                )}&body=${enquiry}`}
                className="rounded-full border border-berry px-6 py-3 font-semibold text-berry hover:bg-blush"
              >
                Email an enquiry
              </a>
              {siteConfig.whatsapp && (
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${enquiry}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-berry px-6 py-3 font-semibold text-berry hover:bg-blush"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
