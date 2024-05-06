import { useFormStatus } from "react-dom";
import { IconLoader, IconModify } from "~/app/_assets/icons";

export default function SubmitRename({ canUpdate }: { canUpdate: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit">
      {pending ? (
        <IconLoader />
      ) : (
        <IconModify color={canUpdate ? "#22c55e" : "#ef4444"} />
      )}
    </button>
  );
}
