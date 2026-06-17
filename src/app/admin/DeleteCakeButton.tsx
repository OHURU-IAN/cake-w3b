"use client";

import { deleteCake } from "@/app/actions/cakes";

export function DeleteCakeButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteCake}
      onSubmit={(e) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-full border border-red-200 px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
}
