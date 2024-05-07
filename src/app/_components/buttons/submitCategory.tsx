import { useFormStatus } from "react-dom";
import { IconAddTask, IconLoader } from "~/app/_assets/icons";

export default function SubmitCategory() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="bg-green-500 px-2 py-1 text-white">
      {pending ? (
        <IconLoader width={18} height={18} />
      ) : (
        <IconAddTask width={18} height={18} />
      )}
    </button>
  );
}
