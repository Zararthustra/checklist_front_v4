"use client";

import { toast } from "sonner";
import { delTask, updateTask } from "~/server/queries";
import { ICategory, ITask } from "../_interfaces";
import { IconCheck, IconCheckEmpty } from "../_assets/icons";

export default function Task({
  task,
  category,
}: {
  task: ITask;
  category: ICategory;
}) {
  const checkTask = async () => {
    const { error, data } = await updateTask(task);
    if (error) toast.error(error);
    else toast.success(data);
  };

  const removeTask = async () => {
    const { error, data } = await delTask(task);
    if (error) toast.error(error);
    else toast.success(data);
  };

  return (
    <div
      onClick={() => {
        if (category.isRecurrent) checkTask();
        else removeTask();
      }}
      style={{
        background:
          category.isRecurrent && task.isDisabled ? category.color : "",
      }}
      className="flex cursor-pointer items-center bg-white py-1 text-center dark:bg-black"
    >
      {category.isRecurrent &&
        (task.isDisabled ? (
          <IconCheck className="ml-4" />
        ) : (
          <IconCheckEmpty className="ml-4" />
        ))}
      <p className="w-full">{task.name}</p>
    </div>
  );
}
