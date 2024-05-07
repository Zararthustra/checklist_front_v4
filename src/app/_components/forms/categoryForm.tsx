"use client";

import { addCategory, addTask } from "~/server/queries";
import { useRef } from "react";
import { toast } from "sonner";
import SubmitCategory from "../buttons/submitCategory";

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
      className="flex overflow-hidden rounded-br-lg rounded-tl-lg"
    >
      <input
        className="w-36 rounded-tl-lg border px-2 py-1 text-sm font-semibold text-black dark:text-white"
        type="text"
        placeholder="Nouvelle categorie"
        name="category"
      />
      <SubmitCategory />
    </form>
  );
}
