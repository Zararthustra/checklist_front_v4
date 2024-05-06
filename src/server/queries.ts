"use server";

// import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { categories, tasks } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  if (!!!formData.get("category"))
    return {
      error: "Veuillez entrer une tâche.",
    };

  try {
    await db.insert(categories).values({
      name: formData.get("category") as string,
      userId: user.userId,
      color: "#ff0",
    });
  } catch (e) {
    return {
      error: "Cannot create category",
    };
  }

  revalidatePath("/");

  return {
    data: formData.get("category") + " ajouté !",
  };
}

export async function delCategory(category: any) {
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
  field: "isHidden" | "color",
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
  });

  return tasks;
}

export async function addTask(categoryId: number, formData: FormData) {
  const user = auth();

  if (!!!user.userId)
    return {
      error: "Unauthorized",
    };

  if (!!!formData.get("task"))
    return {
      error: "Veuillez entrer une tâche.",
    };

  try {
    await db.insert(tasks).values({
      name: formData.get("task") as string,
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
    data: formData.get("task") + " ajouté !",
  };
}

export async function delTask(task: any) {
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
