import { getTasks } from "~/server/queries";
import Tasks from "./task";
import TaskForm from "./forms/taskForm";
import { ICategory } from "../_interfaces";
import HideCategory from "./buttons/hideCategory";
import { CategorySettings } from "./dialogs/categorySettings";

export default async function Category({ category }: { category: ICategory }) {
  const tasks = await getTasks(category.id);

  return (
    <div className="flex h-full w-[500px] max-w-[95%] flex-col items-center overflow-hidden rounded-br-lg rounded-tl-lg">
      <div
        className="w-full bg-red-200 px-2 pb-4 pt-2"
        style={{ background: category.color, color: category.textColor }}
      >
        <div className="flex w-full justify-between">
          <HideCategory category={category} />
          <CategorySettings category={category} tasks={tasks} />
        </div>
        <h1 className="text-center text-2xl font-bold">{category.name}</h1>
      </div>
      {!!tasks.length && !category.isHidden && (
        <div className="my-1 flex w-full flex-col gap-1">
          {tasks.map((task: any) => (
            <Tasks key={task.id} task={task} category={category} />
          ))}
        </div>
      )}
      <TaskForm category={category} />
    </div>
  );
}
