"use client";

import { addCategory, addTask } from "~/server/queries";
import Submit from "../buttons/submit";
import { useRef } from "react";
import { toast } from "sonner";

export default function CategoryForm() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        const { error, data } = await addCategory(formData);
        if (error) toast.error(error);
        else toast.success(data);
        ref.current?.reset();
      }}
    >
      <input
        className="w-44 rounded-br-lg rounded-tl-lg border px-2 py-1 text-sm font-semibold text-black dark:text-white"
        type="text"
        placeholder="Nouvelle categorie"
        name="category"
      />
      {/* <Submit /> */}
    </form>
  );
}
