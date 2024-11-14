import { makeDeleteRequest } from "../factories/delete";
import { makePostRequest } from "../factories/post";
import type { Api } from "../services.types";
import type { CreateInput } from "./comment.types";

const User_URL = "/api/v1/comment";

export const makeCommentService = (api: Api) => ({
  create: makePostRequest<CreateInput>(User_URL, api),
  delete: makeDeleteRequest(User_URL, api),
});
