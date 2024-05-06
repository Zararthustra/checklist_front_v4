"use client";

import { toast } from "sonner";
import { IconTrash } from "~/app/_assets/icons";
import { ICategory } from "~/app/_interfaces";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { delCategory } from "~/server/queries";

export default function ConfirmDelete({ category }: { category: ICategory }) {
  return (
    <Dialog>
      <DialogTrigger className="rounded bg-red-400 px-4 py-1 text-white transition-colors hover:bg-red-600">
        <div className="flex items-center justify-evenly gap-2">
          <IconTrash />
          <p>Supprimer la catégorie</p>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Êtes-vous sûr ?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <button
            onClick={async () => {
              const { error, data } = await delCategory(category);
              if (error) toast.error(error);
              else toast.success(data);
            }}
            className="rounded bg-red-400 px-4 py-1 text-white transition-colors hover:bg-red-600"
          >
            <div className="flex items-center justify-evenly gap-2">
              <IconTrash />
              <p>Supprimer {category.name}</p>
            </div>
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
