"use client";

import { toast } from "sonner";
import { delTask } from "~/server/queries";

export default function Task({ task }: { task: any }) {
  return (
    <p
      onClick={async () => {
        const { error, data } = await delTask(task);
        if (error) toast.error(error);
        else toast.success(data);
      }}
      className="cursor-pointer bg-white py-1 text-center dark:bg-black"
    >
      {task.name}
    </p>
  );
}
