"use client";

import { toast } from "sonner";
import { IconHidden, IconVisible } from "~/app/_assets/icons";
import { ICategory } from "~/app/_interfaces";
import { updateCategory } from "~/server/queries";

export default function HideCategory({ category }: { category: ICategory }) {
  return (
    <p
      className="cursor-pointer text-2xl font-bold"
      onClick={async () => {
        const { error } = await updateCategory(
          category.id,
          "isHidden",
          !category.isHidden,
        );
        if (error) toast.error(error);
      }}
    >
      {category.isHidden ? <IconHidden /> : <IconVisible />}
    </p>
  );
}
