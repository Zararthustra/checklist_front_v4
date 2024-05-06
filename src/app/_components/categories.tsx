import { getCategories } from "~/server/queries";
import Category from "./category";
import { ICategory } from "../_interfaces";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="flex w-full flex-wrap justify-center gap-5">
      {categories.map((category: ICategory) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}
