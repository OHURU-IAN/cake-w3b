import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCake } from "@/lib/cakes";
import { updateCake } from "@/app/actions/cakes";
import { CakeForm } from "@/components/CakeForm";

export const metadata: Metadata = { title: "Edit cake" };

export default async function EditCakePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cake = await getCake(id);
  if (!cake) notFound();

  // Bind the cake id to the update action so the form can call it directly.
  const action = updateCake.bind(null, id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-cocoa">Edit cake</h1>
      <CakeForm action={action} cake={cake} submitLabel="Save changes" />
    </div>
  );
}
