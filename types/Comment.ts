import type { ICreatedInstance } from "./entities";
import type { IUser } from "./User";

export interface IComment extends ICreatedInstance {
  id: number;
  userId: number;
  content: string;
  companyId: number;
  author: string;
  user: Omit<IUser, "comments">;
}
