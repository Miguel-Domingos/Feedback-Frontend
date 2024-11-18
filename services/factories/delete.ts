import { AxiosError, type AxiosRequestConfig } from "axios";
import type { Api } from "../services.types";
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";

export function makeDeleteRequest<I>(
  path: string,
  api: Api,
  configs?: AxiosRequestConfig
) {
  const token = storeToRefs(useAuthStore()).token.value;
  return async (comment_id: I) => {
    try {
      const response = await api.delete(path + "/" + comment_id, {
        ...configs,
        headers: { Authorization: `Bearer ${token.value}` },
      });
      return response.data;
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
