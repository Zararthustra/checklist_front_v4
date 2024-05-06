import { useFormStatus } from "react-dom";
import { IconAddTask, IconLoader } from "~/app/_assets/icons";

export default function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="bg-red-200 px-3 py-2">
      {pending ? <IconLoader /> : <IconAddTask />}
    </button>
  );
}
