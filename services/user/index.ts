import { makeGetRequest } from "../factories/get";
import { makePostRequest } from "../factories/post";
import type { Api } from "../services.types";
import type { CreateInput } from "./user.types";

const User_URL = "/api/v1/user";

export const makeUserService = (api: Api) => ({
  profile: makeGetRequest(User_URL, api),
  create: makePostRequest<CreateInput>(User_URL + "/create", api),
  all: makeGetRequest(User_URL + "/all", api),
});
