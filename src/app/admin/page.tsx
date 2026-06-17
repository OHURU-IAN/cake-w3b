import Link from "next/link";
import type { Metadata } from "next";
import { getAllCakes } from "@/lib/cakes";
import { CakeImage } from "@/components/CakeImage";
import { DeleteCakeButton } from "./DeleteCakeButton";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboard() {
  const cakes = await getAllCakes();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cocoa">Your cakes</h1>
          <p className="mt-1 text-sm text-cocoa/70">
            {cakes.length} {cakes.length === 1 ? "cake" : "cakes"} in your menu.
          </p>
        </div>
        <Link
          href="/admin/new"
          className="rounded-full bg-berry px-5 py-2.5 font-semibold text-cream hover:bg-berry-dark"
        >
          + Add a cake
        </Link>
      </div>

      {cakes.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-rose/50 bg-white p-10 text-center text-cocoa/70">
          <p className="text-lg">You haven&apos;t added any cakes yet.</p>
          <Link
            href="/admin/new"
            className="mt-4 inline-block rounded-full bg-berry px-5 py-2.5 font-semibold text-cream hover:bg-berry-dark"
          >
            Add your first cake
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {cakes.map((cake) => (
            <li
              key={cake.id}
              className="flex items-center gap-4 rounded-2xl border border-blush bg-white p-3"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                <CakeImage
                  src={cake.imageUrl}
                  alt={cake.name}
                  className="h-full w-full"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-cocoa">
                  {cake.name}
                  {cake.featured && <span className="ml-2">⭐</span>}
                </p>
                <p className="text-sm text-cocoa/60">
                  {cake.category}
                  {cake.price ? ` · ${cake.price}` : ""}
                  {!cake.available && (
                    <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      Hidden
                    </span>
                  )}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/${cake.id}/edit`}
                  className="rounded-full border border-rose/40 px-4 py-1.5 text-sm font-medium text-cocoa hover:bg-blush"
                >
                  Edit
                </Link>
                <DeleteCakeButton id={cake.id} name={cake.name} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
