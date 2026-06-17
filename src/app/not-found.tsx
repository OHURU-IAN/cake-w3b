import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl">🍰</p>
      <h1 className="mt-4 text-3xl font-bold text-cocoa">Page not found</h1>
      <p className="mt-2 text-cocoa/70">
        We couldn&apos;t find that page — it may have been moved or sold out.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-berry px-6 py-3 font-semibold text-cream hover:bg-berry-dark"
      >
        Back to the menu
      </Link>
    </div>
  );
}
