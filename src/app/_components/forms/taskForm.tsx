"use client";

import { addTask } from "~/server/queries";
import { useRef } from "react";
import { toast } from "sonner";
import SubmitTask from "../buttons/submitTask";

export default function TaskForm({ category }: { category: any }) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        const { error, data } = await addTask(category.id, formData);
        if (error) toast.error(error);
        else toast.success(data);
        ref.current?.reset();
      }}
      className="flex w-full"
    >
      <input
        className="w-full px-2 py-1 text-sm font-semibold text-black dark:text-white"
        type="text"
        name="task"
      />
      <SubmitTask />
    </form>
  );
}
