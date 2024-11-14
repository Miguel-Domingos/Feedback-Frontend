import { AxiosError, type AxiosRequestConfig } from "axios";
import type { Api } from "../services.types";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";
import type { IResponse } from "./factories.types";

export function makePostRequest<P>(
  path: string,
  api: Api,
  configs?: AxiosRequestConfig
) {
  const token = storeToRefs(useAuthStore()).token.value;

  return async (payload: P): Promise<IResponse> => {
    try {
      const response = await api.post(path, payload, {
        ...configs,
        headers: { Authorization: `Bearer ${token.value}` },
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
