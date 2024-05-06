"use client";

import Settings from "./settings";
import { ICategory, ITask } from "~/app/_interfaces";
import ConfirmDelete from "./confirmDelete";
import UpdateCategoryForm from "../forms/updateCategoryForm";
import { Switch } from "~/components/ui/switch";
import { updateCategory } from "~/server/queries";
import { toast } from "sonner";
import { IconSMS } from "~/app/_assets/icons";

export function CategorySettings({
  category,
  tasks,
}: {
  category: ICategory;
  tasks: ITask[];
}) {
  return (
    <Settings title={category.name}>
      <div className="my-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="whitespace-nowrap text-zinc-500 dark:text-zinc-400">
            Changer de couleur
          </p>
          <button>Couleurs</button>
        </div>

        <div className="flex items-center justify-between">
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

        <div className="flex items-center justify-between">
          <p className="whitespace-nowrap text-zinc-500 dark:text-zinc-400">
            Envoyer par SMS
          </p>
          <a
            href={
              "sms:?&body=Voici ma liste " +
              category.name +
              " :%0a " +
              tasks
                .map((task) =>
                  task.isDisabled ? "✅ " + task.name : "☑️ " + task.name,
                )
                .join("%0a ")
            }
            className="flex cursor-pointer items-center gap-2 rounded bg-green-500 px-3 py-1 text-white"
          >
            <IconSMS />
            <p className="text-sm">Envoyer</p>
          </a>
        </div>

        <div className="flex items-center justify-between">
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
