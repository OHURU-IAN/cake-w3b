import { prisma } from "./prisma";

/** All cakes that should appear on the public site, newest/featured first. */
export function getPublicCakes() {
  return prisma.cake.findMany({
    where: { available: true },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

/** Every cake, for the admin dashboard. */
export function getAllCakes() {
  return prisma.cake.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export function getCake(id: string) {
  return prisma.cake.findUnique({ where: { id } });
}
