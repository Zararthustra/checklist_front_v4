import { useFormStatus } from "react-dom";
import { IconLoader, IconLogin } from "~/app/_assets/icons";

export default function SubmitImport() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="flex w-36 items-center justify-evenly gap-2 rounded bg-green-500 px-4 py-1 text-white transition-colors hover:bg-green-600"
    >
      {pending ? <IconLoader width={18} height={18} /> : <IconLogin />}
      <p className="text-sm">{pending ? "Importation..." : "Importer"}</p>
    </button>
  );
}
