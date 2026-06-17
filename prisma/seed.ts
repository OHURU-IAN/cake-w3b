import { PrismaClient } from "@prisma/client";
import { promises as fs } from "node:fs";
import path from "node:path";

const prisma = new PrismaClient();

type Sample = {
  name: string;
  description: string;
  price: string;
  category: string;
  featured?: boolean;
  bg: [string, string];
  emoji: string;
};

const samples: Sample[] = [
  {
    name: "Classic Victoria Sponge",
    description:
      "Light vanilla sponge layered with raspberry jam and vanilla buttercream, finished with a dusting of icing sugar.",
    price: "from £24",
    category: "Celebration",
    featured: true,
    bg: ["#fbe9e7", "#e7a0a0"],
    emoji: "🍰",
  },
  {
    name: "Chocolate Fudge Cake",
    description:
      "Rich, moist chocolate sponge with silky chocolate ganache. A crowd-pleaser for any occasion.",
    price: "from £28",
    category: "Birthday",
    featured: true,
    bg: ["#efe1d6", "#a87e5f"],
    emoji: "🎂",
  },
  {
    name: "Lemon Drizzle Loaf",
    description:
      "Zesty lemon sponge soaked in a tangy sugar drizzle. Perfect with a cup of tea.",
    price: "£18",
    category: "Cookies & Bakes",
    bg: ["#fdf6d8", "#e9d27a"],
    emoji: "🍋",
  },
  {
    name: "Vanilla Bean Cupcakes (x12)",
    description:
      "A dozen fluffy vanilla cupcakes topped with swirls of buttercream and sprinkles.",
    price: "£22 / dozen",
    category: "Cupcakes",
    bg: ["#fbe9f1", "#e79ec0"],
    emoji: "🧁",
  },
  {
    name: "Two-Tier Wedding Cake",
    description:
      "Elegant tiered cake with smooth buttercream and fresh florals. Flavours and design made to order — let's chat!",
    price: "from £150",
    category: "Wedding",
    bg: ["#f3f0ea", "#cfc3b0"],
    emoji: "💐",
  },
  {
    name: "Salted Caramel Brownies (x9)",
    description:
      "Fudgy dark chocolate brownies rippled with salted caramel. Sold by the box of nine.",
    price: "£16 / box",
    category: "Cookies & Bakes",
    bg: ["#ece0d4", "#8c5a3b"],
    emoji: "🍫",
  },
];

function svg(s: Sample): string {
  const [c1, c2] = s.bg;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <text x="400" y="300" font-size="200" text-anchor="middle" dominant-baseline="central">${s.emoji}</text>
  <text x="400" y="470" font-size="34" font-family="Georgia, serif" fill="#4a3528" text-anchor="middle">${s.name}</text>
</svg>`;
}

async function main() {
  const uploadDir =
    process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  console.log("Clearing existing cakes…");
  await prisma.cake.deleteMany();

  let order = 0;
  for (const s of samples) {
    const filename = `sample-${order}.svg`;
    await fs.writeFile(path.join(uploadDir, filename), svg(s), "utf8");
    await prisma.cake.create({
      data: {
        name: s.name,
        description: s.description,
        price: s.price,
        category: s.category,
        featured: s.featured ?? false,
        available: true,
        sortOrder: order,
        imageUrl: `/media/${filename}`,
      },
    });
    order++;
  }

  console.log(`Seeded ${samples.length} cakes. 🎉`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
