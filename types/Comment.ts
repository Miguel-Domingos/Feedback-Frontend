import type { ICreatedInstance } from "./entities";
import type { IUser } from "./User";

export interface IComment extends ICreatedInstance {
  id: string | number;
  userId: string | number;
  content: string;
  companyId: string | number;
  author: string;
  user: Omit<IUser, "comments">;
}
