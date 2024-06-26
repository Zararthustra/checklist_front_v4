"use server";

import { auth } from "@clerk/nextjs/server";
import { categories, tasks } from "./db/schema";
import { db } from "./db";
import { revalidatePath } from "next/cache";
import type { ICategory, ITask } from "~/app/_interfaces";

type fetchType<T> = {
  json: () => Promise<T>;
  status: number;
};
interface ITaskCategory extends ITask {
  category: string;
}

const login = async (account: string, password: string) => {
  const loginResponse: fetchType<{ access: string }> = await fetch(
    "https://checklist.pythonanywhere.com/api/token/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: account,
        password: password,
      }),
    },
  );

  const loginData = await loginResponse.json();
  const loginStatus = loginResponse.status;

  return {
    loginStatus,
    loginData,
  };
};

const getCategories = async (accessToken: string) => {
  const categoriesResponse: fetchType<ICategory[]> = await fetch(
    "https://checklist.pythonanywhere.com/api/category",
    {
      method: "GET",
      headers: {
        authorization: "Bearer " + accessToken,
      },
    },
  );

  const categoriesData = await categoriesResponse.json();
  const categoriesStatus = categoriesResponse.status;

  return {
    categoriesData,
    categoriesStatus,
  };
};

const getTasks = async (accessToken: string) => {
  const tasksResponse: fetchType<ITaskCategory[]> = await fetch(
    "https://checklist.pythonanywhere.com/api/tasks",
    {
      method: "GET",
      headers: {
        authorization: "Bearer " + accessToken,
      },
    },
  );

  const tasksData = await tasksResponse.json();
  const tasksStatus = tasksResponse.status;

  return {
    tasksData,
    tasksStatus,
  };
};

const createCategories = async (
  categoriesToImport: ICategory[],
  userId: string,
) => {
  if (!!!userId)
    return {
      error: "Unauthorized",
    };

  const categoriesIdsMatch: {
    oldId: string;
    newId: number;
  }[] = [];

  for (const categoryToImport of categoriesToImport) {
    const categoryCreated = await db
      .insert(categories)
      .values({
        name: categoryToImport.name,
        userId: userId,
        color: categoryToImport.color,
        textColor: "white",
        isRecurrent: categoryToImport.isRecurrent,
      })
      .returning();

    if (!!!categoryCreated || !!!categoryCreated[0])
      return {
        error: "Une erreur est survenue lors de la création des catégories",
      };

    // Store temporary old Categories ID in order to find their Tasks later (Task.categoryId)
    categoriesIdsMatch.push({
      oldId: String(categoryToImport.id),
      newId: categoryCreated[0].id,
    });
  }

  return {
    categoriesIdsMatch,
  };
};

const createTasks = async (
  categoriesIdsMatch: { oldId: string; newId: number }[] | undefined,
  tasksToImport: ITaskCategory[],
  userId: string,
) => {
  if (!!!userId)
    return {
      taskError: "Unauthorized",
    };

  if (!!!categoriesIdsMatch)
    return {
      taskError: "Une erreur est survenue lors de la création des tâches",
    };

  for (const category of categoriesIdsMatch) {
    const tasksCreated = await db
      .insert(tasks)
      .values(
        tasksToImport
          // Match old IDs stored earlier
          .filter((task) => category.oldId === task.category)
          .map((task) => ({
            name: task.name,
            userId: userId,
            isDisabled: task.isDisabled,
            categoryId: category.newId,
          })),
      )
      .returning();

    if (!!!tasksCreated)
      return {
        taskError: "Une erreur est survenue lors de la création des tâches",
      };
  }

  return {};
};

export async function importChecklist(formData: FormData) {
  const user = auth();

  if (!user.userId) return { error: "Unauthorized" };

  const account = formData.get("account") as string;
  const password = formData.get("password") as string;

  if (!!!account || !!!password)
    return { error: "Veuillez remplir les champs" };

  // Login checklist
  const { loginStatus, loginData } = await login(account, password);

  if (loginStatus !== 200)
    return {
      error:
        loginStatus === 401
          ? "Compte inconnu"
          : "Une erreur est survenue lors de la connexion",
    };

  // Import Categories
  const { categoriesData, categoriesStatus } = await getCategories(
    loginData.access,
  );

  if (categoriesStatus !== 200)
    return {
      error: "Une erreur est survenue lors de l'import des catégories",
    };

  // Create Categories from imported Categories
  const { categoriesIdsMatch, error } = await createCategories(
    categoriesData,
    user.userId,
  );

  if (!!error) return { error };

  // Import Tasks
  const { tasksData, tasksStatus } = await getTasks(loginData.access);

  if (tasksStatus !== 200)
    return {
      error: "Une erreur est survenue lors de l'import des catégories",
    };

  // Create Tasks from imported Tasks created Categories
  const { taskError } = await createTasks(
    categoriesIdsMatch,
    tasksData,
    user.userId,
  );

  if (!!taskError) return { error: taskError };

  revalidatePath("/");

  return {
    data: "Importation réussie !",
  };
}
