import type { Metadata } from "next";
import { createCake } from "@/app/actions/cakes";
import { CakeForm } from "@/components/CakeForm";

export const metadata: Metadata = { title: "Add a cake" };

export default function NewCakePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-cocoa">Add a cake</h1>
      <CakeForm action={createCake} submitLabel="Add cake" />
    </div>
  );
}
