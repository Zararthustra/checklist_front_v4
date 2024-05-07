"use client";

import Settings from "./settings";
import { ICategory, ITask } from "~/app/_interfaces";
import ConfirmDelete from "./confirmDelete";
import UpdateCategoryForm from "../forms/updateCategoryForm";
import { Switch } from "~/components/ui/switch";
import { updateCategory } from "~/server/queries";
import { toast } from "sonner";
import { IconSMS } from "~/app/_assets/icons";
import ColorPopover from "../colorPopover";

export function CategorySettings({
  category,
  tasks,
}: {
  category: ICategory;
  tasks: ITask[];
}) {
  return (
    <Settings title={category.name}>
      <div className="relative overflow-hidden">
        <div className=" my-10 flex flex-col gap-4 ">
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
              Changer de couleur
            </p>
            <ColorPopover category={category} />
          </div>

          <div className="flex items-center justify-between">
            <p className="whitespace-nowrap text-zinc-500 dark:text-zinc-400">
              Renommer
            </p>
            <UpdateCategoryForm category={category} />
          </div>

          <div
            className="absolute rounded-full sm:left-[-60px] sm:top-[210px] sm:h-48 sm:w-48"
            style={{ background: category.color }}
          />
        </div>

        <div className="mt-14 flex justify-between">
          <div />
          <ConfirmDelete category={category} />
        </div>
      </div>
    </Settings>
  );
}
