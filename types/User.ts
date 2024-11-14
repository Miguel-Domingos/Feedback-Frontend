import type { IComment } from "./Comment";

export interface IUser {
  id: number | string;
  name: string;
  email: string;
  description: string;
  role: string;
  comments?: IComment[];
}

export interface IToken {
  type: string;
  value: string;
}

export interface IAuthenticatedUser {
  token: IToken;
  user: IUser;
}
