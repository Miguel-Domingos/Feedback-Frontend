import { makeDeleteRequest } from "../factories/delete";
import { makePostRequest } from "../factories/post";
import { makePutRequest } from "../factories/put";
import type { Api } from "../services.types";
import type { CreateInput, DeleteInput, UpdateInput } from "./comment.types";

const User_URL = "/api/v1/comment";

export const makeCommentService = (api: Api) => ({
  create: makePostRequest<CreateInput>(User_URL, api),
  delete: makeDeleteRequest<DeleteInput>(User_URL, api),
  update: makePutRequest<UpdateInput>(User_URL, api),
});
