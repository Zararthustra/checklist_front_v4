export type { ICategory, ITask };

interface ICategory {
  id: number;
  name: string;
  color: string;
  isHidden: boolean;
  isRecurrent: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
}

interface ITask {
  id: number;
  categoryId: ICategory["id"];
  name: string;
  userId: string;
  isDisabled: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}
