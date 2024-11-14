import { AxiosConfig } from "./config";
import { makeAuth } from "./auth";
import { makeUserService } from "./user";
import { makeCommentService } from "./comment";

export default {
  auth: makeAuth(AxiosConfig),
  user: makeUserService(AxiosConfig),
  comment: makeCommentService(AxiosConfig),
};
