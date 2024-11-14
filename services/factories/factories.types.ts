import type { IUser } from "~/types";

export interface IDataResponse {
  user: IUser;
}

export interface IResponse {
  status: number;
  message: string;
  data: any;
  error: string | null;
}
