"use server";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { categories, tasks } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { flat, gradients, greys, pastels } from "~/app/_data/colors";
import type { ICategory, ITask } from "~/app/_interfaces";

// Category
export async function getCategories() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const categories = await db.query.categories.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { asc }) => [asc(model.createdAt)],
  });

  return categories;
}

export async function addCategory(formData: FormData) {
  const user = auth();

  if (!!!user.userId)
    return {
      error: "Unauthorized",
    };

  const category = formData.get("category");

  if (!!!category || typeof category !== "string")
    return {
      error: "Veuillez entrer une catégorie.",
    };

  const colorsArray: string[] = [...flat, ...gradients, ...pastels, ...greys];

  try {
    await db.insert(categories).values({
      name: category,
      userId: user.userId,
      color:
        colorsArray[Math.floor(Math.random() * colorsArray.length)] ?? "#ff0",
      textColor: "white",
    });
  } catch (e) {
    return {
      error: "Cannot create category",
    };
  }

  revalidatePath("/");

  return {
    data: `${category} ajouté !`,
  };
}

export async function delCategory(category: ICategory) {
  const user = auth();

  if (!!!user.userId)
    return {
      error: "Unauthorized",
    };

  try {
    await db.delete(categories).where(eq(categories.id, category.id));
  } catch (e) {
    return {
      error: "Cannot delete category",
    };
  }

  revalidatePath("/");

  return {
    data: category.name + " supprimé !",
  };
}

export async function updateCategory(
  categoryId: number,
  field: "isHidden" | "color" | "name" | "isRecurrent" | "textColor",
  value: boolean | string,
) {
  const user = auth();

  if (!!!user.userId)
    return {
      error: "Unauthorized",
    };

  try {
    await db
      .update(categories)
      .set({
        [field]: value,
      })
      .where(
        and(eq(categories.userId, user.userId), eq(categories.id, categoryId)),
      );
  } catch (e) {
    return {
      error: "Cannot update category",
    };
  }

  revalidatePath("/");

  return {};
}

// Task
export async function getTasks(categoryId: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const tasks = await db.query.tasks.findMany({
    where: (model, { eq }) =>
      and(eq(model.userId, user.userId), eq(model.categoryId, categoryId)),
    orderBy: (model, { asc }) => [asc(model.isDisabled)],
  });

  return tasks;
}

export async function addTask(categoryId: number, formData: FormData) {
  const user = auth();

  if (!!!user.userId)
    return {
      error: "Unauthorized",
    };

  const task = formData.get("task");

  if (!!!task || typeof task !== "string")
    return {
      error: "Veuillez entrer une tâche.",
    };

  try {
    await db.insert(tasks).values({
      name: task,
      userId: user.userId,
      categoryId,
    });
  } catch (e) {
    return {
      error: "Cannot create task",
    };
  }

  revalidatePath("/");

  return {
    data: `${task} ajouté !`,
  };
}

export async function updateTask(task: ITask) {
  const user = auth();

  if (!!!user.userId)
    return {
      error: "Unauthorized",
    };

  try {
    await db
      .update(tasks)
      .set({
        isDisabled: !task.isDisabled,
      })
      .where(and(eq(tasks.userId, user.userId), eq(tasks.id, task.id)));
  } catch (e) {
    return {
      error: "Cannot update category",
    };
  }

  revalidatePath("/");
  if (!task.isDisabled) return { data: task.name + " check !" };
  return { data: task.name + " à faire" };
}

export async function delTask(task: ITask) {
  const user = auth();

  if (!!!user.userId)
    return {
      error: "Unauthorized",
    };

  try {
    await db.delete(tasks).where(eq(tasks.id, task.id));
  } catch (e) {
    return {
      error: "Cannot delete task",
    };
  }

  revalidatePath("/");

  return {
    data: task.name + " supprimé !",
  };
}
