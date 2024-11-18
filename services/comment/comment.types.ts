export enum Create {
  content = "content",
  companyId = "company_id",
  commentId = "comment_id",
}

export interface CreateInput {
  [Create.content]: string;
  [Create.companyId]: number;
}

export interface UpdateInput {
  [Create.content]: string;
  [Create.commentId]: number;
}

export interface DeleteInput {
  [Create.commentId]: number;
}
