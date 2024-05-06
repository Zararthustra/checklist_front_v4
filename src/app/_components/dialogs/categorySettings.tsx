"use client";

import { useRef } from "react";
import Settings from "./settings";
import { ICategory } from "~/app/_interfaces";
import ConfirmDelete from "./confirmDelete";
import UpdateCategoryForm from "../forms/updateCategoryForm";
import { Switch } from "~/components/ui/switch";
import { updateCategory } from "~/server/queries";
import { toast } from "sonner";

export function CategorySettings({ category }: { category: ICategory }) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <Settings title={category.name}>
      <div className="my-10 flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="whitespace-nowrap text-zinc-500 dark:text-zinc-400">
            Changer de couleur
          </p>
          <button>Couleurs</button>
        </div>

        <div className="flex justify-between">
          <p className="whitespace-nowrap text-zinc-500 dark:text-zinc-400">
            Tâches récurrentes
          </p>
          <Switch
            id="recurrent"
            checked={category.isRecurrent}
            onCheckedChange={async (checked) => {
              const { error } = await updateCategory(
                category.id,
                "isRecurrent",
                checked,
              );
              if (!!error) toast.error(error);
            }}
          />
        </div>

        <div className="flex justify-between">
          <p className="whitespace-nowrap text-zinc-500 dark:text-zinc-400">
            Envoyer par SMS
          </p>
          <button>Envoyer</button>
        </div>

        <div className="flex justify-between">
          <p className="whitespace-nowrap text-zinc-500 dark:text-zinc-400">
            Renommer
          </p>
          <UpdateCategoryForm category={category} />
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div />
        <ConfirmDelete category={category} />
      </div>
    </Settings>
  );
}
