"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { ICategory } from "~/app/_interfaces";
import { updateCategory } from "~/server/queries";
import SubmitRename from "../buttons/submitRename";

export default function UpdateCategoryForm({
  category,
}: {
  category: ICategory;
}) {
  const [renameValue, setRenameValue] = useState<string>(category.name);

  return (
    <form
      action={async (formdata: FormData) => {
        if (!!!renameValue || renameValue === category.name) return;
        const { error } = await updateCategory(
          category.id,
          "name",
          renameValue as string,
        );
        if (!!error) toast.error(error);
      }}
      className="flex items-center gap-1"
    >
      <input
        type="text"
        name="name"
        className="w-[120px] pl-1"
        value={renameValue}
        onChange={(e) => setRenameValue(e.target.value)}
      />
      <SubmitRename
        canUpdate={!!renameValue && renameValue !== category.name}
      />
    </form>
  );
}
