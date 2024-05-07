import { useFormStatus } from "react-dom";
import { IconAddTask, IconLoader } from "~/app/_assets/icons";
import { ICategory } from "~/app/_interfaces";

export default function SubmitTask({ category }: { category: ICategory }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="px-3 py-2"
      style={{
        background:
          category.color[0] === "l"
            ? category.color.split(",")[1]
            : category.color,
        color: category.textColor,
      }}
    >
      {pending ? <IconLoader /> : <IconAddTask />}
    </button>
  );
}
