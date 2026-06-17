"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Cake } from "@prisma/client";
import { siteConfig } from "@/lib/site-config";
import { CakeImage } from "@/components/CakeCard";

export function CakeForm({
  action,
  cake,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  cake?: Cake;
  submitLabel: string;
}) {
  const router = useRouter();
  const [preview, setPreview] = useState<string>(cake?.imageUrl ?? "");
  const [error, setError] = useState<string>("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(formData: FormData) {
    setError("");
    setSaving(true);
    try {
      await action(formData);
      // On success the action redirects, so we usually won't reach here.
    } catch (err) {
      // redirect() throws a special error we should ignore.
      if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
        return;
      }
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
      setSaving(false);
    }
  }

  return (
    <form
      action={onSubmit}
      encType="multipart/form-data"
      className="mt-6 grid gap-6 md:grid-cols-[1fr_300px]"
    >
      {/* Left: text fields */}
      <div className="space-y-4">
        <Field label="Cake name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            defaultValue={cake?.name ?? ""}
            placeholder="e.g. Classic Victoria Sponge"
            className={inputClass}
          />
        </Field>

        <Field label="Description" htmlFor="description">
          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={cake?.description ?? ""}
            placeholder="Flavours, sizes, what makes it special…"
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Price (free text)" htmlFor="price">
            <input
              id="price"
              name="price"
              defaultValue={cake?.price ?? ""}
              placeholder="e.g. from £25"
              className={inputClass}
            />
          </Field>

          <Field label="Category" htmlFor="category">
            <select
              id="category"
              name="category"
              defaultValue={cake?.category ?? siteConfig.categories[0]}
              className={inputClass}
            >
              {siteConfig.categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label="Display order (lower shows first)"
          htmlFor="sortOrder"
        >
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={cake?.sortOrder ?? 0}
            className={inputClass}
          />
        </Field>

        <div className="flex flex-wrap gap-6">
          <Checkbox
            name="available"
            label="Show on the website"
            defaultChecked={cake ? cake.available : true}
          />
          <Checkbox
            name="featured"
            label="Mark as a favourite ⭐"
            defaultChecked={cake?.featured ?? false}
          />
        </div>
      </div>

      {/* Right: photo */}
      <div>
        <p className="text-sm font-medium text-cocoa">Photo</p>
        <div className="mt-1 overflow-hidden rounded-2xl border border-blush bg-white">
          <CakeImage
            src={preview}
            alt="Preview"
            className="aspect-square h-full w-full"
          />
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          className="mt-3 block w-full text-sm text-cocoa file:mr-3 file:rounded-full file:border-0 file:bg-blush file:px-4 file:py-2 file:font-medium file:text-berry hover:file:bg-rose/30"
        />
        {cake?.imageUrl && (
          <p className="mt-2 text-xs text-cocoa/60">
            Leave empty to keep the current photo.
          </p>
        )}
      </div>

      {/* Footer spans both columns */}
      <div className="md:col-span-2">
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-berry px-6 py-3 font-semibold text-cream hover:bg-berry-dark disabled:opacity-60"
          >
            {saving ? "Saving…" : submitLabel}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="rounded-full border border-rose/40 px-6 py-3 font-semibold text-cocoa hover:bg-blush"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-rose/40 bg-white px-3 py-2 text-cocoa outline-none focus:border-berry focus:ring-2 focus:ring-berry/30";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-cocoa">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-cocoa">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-rose/50 text-berry focus:ring-berry/30"
      />
      {label}
    </label>
  );
}
