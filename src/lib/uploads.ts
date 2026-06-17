import path from "node:path";

/**
 * Where uploaded photos are stored.
 * - Locally: an `uploads/` folder in the project.
 * - In production (Railway): set UPLOAD_DIR to a path on the persistent
 *   volume, e.g. `/data/uploads`, so photos survive restarts/redeploys.
 */
export function getUploadDir(): string {
  return process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");
}

/** The public URL a stored file is served from (handled by /media/[file]). */
export function mediaUrl(filename: string): string {
  return `/media/${filename}`;
}
