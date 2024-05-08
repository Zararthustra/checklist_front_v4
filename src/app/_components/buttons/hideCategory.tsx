"use client";

import { toast } from "sonner";
import { IconHidden, IconLoader, IconVisible } from "~/app/_assets/icons";
import type { ICategory } from "~/app/_interfaces";
import { updateCategory } from "~/server/queries";
import { useState } from "react";

export default function HideCategory({ category }: { category: ICategory }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <p
      className="cursor-pointer text-2xl font-bold"
      onClick={async () => {
        setIsLoading(true);
        const { error } = await updateCategory(
          category.id,
          "isHidden",
          !category.isHidden,
        );
        setIsLoading(false);
        if (error) toast.error(error);
      }}
    >
      {isLoading ? (
        <IconLoader />
      ) : category.isHidden ? (
        <IconHidden />
      ) : (
        <IconVisible />
      )}
    </p>
  );
}
