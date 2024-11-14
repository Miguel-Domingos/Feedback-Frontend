import { makeGetRequest } from "../factories/get";
import { makePostRequest } from "../factories/post";
import { makeDeleteRequest } from "../factories/delete";
import type { Api } from "../services.types";
import type { LoginInput } from "./auth.types";

const AUTH_URL = "/api/v1/auth";
export const makeAuth = (api: Api) => ({
  welcome: makeGetRequest("/api/v1", api),
  login: makePostRequest<LoginInput>(AUTH_URL + "/login", api),
  logout: makeDeleteRequest(AUTH_URL + "/logout", api),
});
