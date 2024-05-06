import { getTasks } from "~/server/queries";
import Tasks from "./task";
import TaskForm from "./forms/taskForm";
import Settings from "./dialogs/settings";
import ConfirmDelete from "./dialogs/confirmDelete";
import { ICategory } from "../_interfaces";
import HideCategory from "./buttons/hideCategory";

function CategorySettings({ category }: { category: ICategory }) {
  return (
    <Settings title={category.name}>
      <div className="my-10 flex flex-col gap-4">
        <div className="flex justify-between">
          <p>Changer de couleur</p>
          <button>Couleurs</button>
        </div>

        <div className="flex justify-between">
          <p>Tâches récurrentes</p>
          <button>Non</button>
        </div>

        <div className="flex justify-between">
          <p>Renommer</p>
          <button>Renommer</button>
        </div>

        <div className="flex justify-between">
          <p>Envoyer par SMS</p>
          <button>Envoyer</button>
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div />
        <ConfirmDelete category={category} />
      </div>
    </Settings>
  );
}

export default async function Category({ category }: { category: ICategory }) {
  const tasks = await getTasks(category.id);

  return (
    <div className="flex h-full w-[500px] max-w-[95%] flex-col items-center overflow-hidden rounded-br-lg rounded-tl-lg">
      <div
        className="w-full bg-red-200 px-2 pb-4 pt-2"
        // style={{ backgroundColor: category.color }}
      >
        <div className="flex w-full justify-between">
          <HideCategory category={category} />
          <CategorySettings category={category} />
        </div>
        <h1 className="text-center text-2xl font-bold">{category.name}</h1>
      </div>
      {!!tasks.length && !category.isHidden && (
        <div className="my-1 flex w-full flex-col gap-1">
          {tasks.map((task: any) => (
            <Tasks key={task.id} task={task} />
          ))}
        </div>
      )}
      <TaskForm category={category} />
    </div>
  );
}
