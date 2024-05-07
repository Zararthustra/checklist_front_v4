import { useFormStatus } from "react-dom";
import { IconAddTask, IconLoader } from "~/app/_assets/icons";

export default function SubmitTask({
  categoryColor,
}: {
  categoryColor: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-red-200 px-3 py-2"
      style={{
        background:
          categoryColor[0] === "l"
            ? categoryColor.split(",")[1]
            : categoryColor,
      }}
    >
      {pending ? <IconLoader /> : <IconAddTask />}
    </button>
  );
}
