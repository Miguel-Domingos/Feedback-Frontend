import { AxiosError, type AxiosRequestConfig } from "axios";
import type { Api } from "../services.types";
import type { IResponse } from "./factories.types";

export function makeGetRequest<I>(
  path: string,
  api: Api,
  configs?: AxiosRequestConfig
) {
  return async (id?: I): Promise<IResponse> => {
    try {
      const response = await api.get(path + `/${id || ""}`, {
        ...configs,
      });

      return response.data;
    } catch (error: any) {
      return {
        status: 401,
        message: "internal error",
        data: null,
        error: error,
      };
    }
  };
}
