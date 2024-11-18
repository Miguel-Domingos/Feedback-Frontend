import { AxiosError, type AxiosRequestConfig } from "axios";
import type { Api } from "../services.types";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";

export function makePutRequest<P>(
  path: string,
  api: Api,
  configs?: AxiosRequestConfig
) {
  const token = storeToRefs(useAuthStore()).token.value;

  return async (payload: P) => {
    try {
      const response = await api.put(path, payload, {
        ...configs,
        headers: { Authorization: `Bearer ${token.value}` },
      });
      return {
        data: response.data,
        error: null,
      };
    } catch (error) {
      return {
        status: 401,
        message: "internal error",
        data: null,
        error: error,
      };
    }
  };
}
