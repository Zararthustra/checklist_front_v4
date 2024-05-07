"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { IconLogin } from "~/app/_assets/icons";
import { toast } from "sonner";
import { importChecklist } from "~/server/importChecklist";
import SubmitImport from "../buttons/submitImport";

export default function ImportChecklist() {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center justify-evenly gap-2 rounded bg-green-500 px-4 py-1 text-white transition-colors hover:bg-green-600">
        <IconLogin />
        <p className="text-sm">Importer</p>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-5">Saisissez vos identifiants</DialogTitle>
        </DialogHeader>
        <form
          action={async (formData) => {
            const { error, data } = await importChecklist(formData);
            if (error) toast.error(error);
            else toast.success(data);
          }}
          className="my-2 flex flex-col items-center gap-2"
        >
          <input
            className="w-36 px-2 py-1 text-sm font-semibold text-black dark:text-white"
            type="text"
            placeholder="Nom du compte"
            name="account"
          />
          <input
            className="w-36 px-2 py-1 text-sm font-semibold text-black dark:text-white"
            type="password"
            placeholder="Mot de passe"
            name="password"
          />
          <SubmitImport />
        </form>
      </DialogContent>
    </Dialog>
  );
}
