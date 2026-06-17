"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isLoggedIn } from "@/lib/session";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

async function requireAuth() {
  if (!(await isLoggedIn())) {
    throw new Error("Not authorized");
  }
}

/** Save an uploaded image to /public/uploads and return its public URL. */
async function saveImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Unsupported image type. Use JPG, PNG, WEBP or GIF.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image is too large (max 8 MB).");
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().slice(0, 5);
  const filename = `${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

function readFields(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    price: String(formData.get("price") ?? "").trim(),
    category: String(formData.get("category") ?? "Other").trim(),
    available: formData.get("available") === "on",
    featured: formData.get("featured") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
  };
}

export async function createCake(formData: FormData) {
  await requireAuth();
  const fields = readFields(formData);
  if (!fields.name) throw new Error("Please give the cake a name.");

  const image = formData.get("image");
  let imageUrl = "";
  if (image instanceof File && image.size > 0) {
    imageUrl = await saveImage(image);
  }

  await prisma.cake.create({ data: { ...fields, imageUrl } });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateCake(id: string, formData: FormData) {
  await requireAuth();
  const fields = readFields(formData);
  if (!fields.name) throw new Error("Please give the cake a name.");

  const data: Record<string, unknown> = { ...fields };

  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    data.imageUrl = await saveImage(image);
  }

  await prisma.cake.update({ where: { id }, data });

  revalidatePath("/");
  revalidatePath(`/cakes/${id}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteCake(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await prisma.cake.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin");
  }
  redirect("/admin");
}
