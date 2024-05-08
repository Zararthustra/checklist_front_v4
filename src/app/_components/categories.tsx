import { getCategories } from "~/server/queries";
import Category from "./category";
import type { ICategory } from "../_interfaces";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="mb-20 mt-2 flex w-full flex-wrap justify-center gap-5">
      {categories.map((category: ICategory) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}
