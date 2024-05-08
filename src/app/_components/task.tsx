"use client";

import { toast } from "sonner";
import { delTask, updateTask } from "~/server/queries";
import type { ICategory, ITask } from "../_interfaces";
import { IconCheck, IconCheckEmpty, IconLoader } from "../_assets/icons";
import { useState } from "react";

export default function Task({
  task,
  category,
}: {
  task: ITask;
  category: ICategory;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkTask = async () => {
    setIsLoading(true);
    const { error, data } = await updateTask(task);
    setIsLoading(false);
    if (error) toast.error(error);
    else toast.success(data);
  };

  const removeTask = async () => {
    setIsLoading(true);
    const { error, data } = await delTask(task);
    setIsLoading(false);
    if (error) toast.error(error);
    else toast.success(data);
  };

  return (
    <div
      onClick={async () => {
        if (category.isRecurrent) await checkTask();
        else await removeTask();
      }}
      style={{
        background:
          category.isRecurrent && task.isDisabled ? category.color : "",
        color:
          category.isRecurrent && task.isDisabled ? category.textColor : "",
      }}
      className="flex cursor-pointer items-center justify-center bg-white py-1 text-center dark:bg-black"
    >
      {isLoading ? (
        <IconLoader />
      ) : (
        <>
          {category.isRecurrent &&
            (task.isDisabled ? (
              <IconCheck className="ml-4" />
            ) : (
              <IconCheckEmpty className="ml-4" />
            ))}
          <p className="w-full">{task.name}</p>
        </>
      )}
    </div>
  );
}
