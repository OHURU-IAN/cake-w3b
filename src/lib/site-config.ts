/**
 * Your business details. Edit the values below to personalise the site.
 * (These are the only "code" bits you'd touch for branding — everything else,
 *  like cakes and prices, is managed from the /admin page.)
 */
export const siteConfig = {
  name: "Sweet Layers",
  tagline: "Handmade cakes baked fresh to order",
  // Short blurb shown on the homepage hero.
  intro:
    "Celebration cakes, cupcakes and bakes made from scratch in small batches. Browse the menu below, then get in touch to place your order.",

  // Contact details — shown in the footer and the "How to order" section.
  phone: "07123 456789",
  email: "hello@sweetlayers.example",
  instagram: "sweetlayers", // without the @
  whatsapp: "447123456789", // full international number, digits only (for wa.me links)
  location: "Manchester, UK",

  // The categories cakes can belong to. Add or rename as you like.
  categories: [
    "Celebration",
    "Birthday",
    "Wedding",
    "Cupcakes",
    "Cookies & Bakes",
    "Other",
  ],
} as const;

export type Category = (typeof siteConfig.categories)[number];
