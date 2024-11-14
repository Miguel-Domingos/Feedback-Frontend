export enum Create {
  content = "content",
  companyId = "company_id",
}

export interface CreateInput {
  [Create.content]: string;
  [Create.companyId]: string;
}
