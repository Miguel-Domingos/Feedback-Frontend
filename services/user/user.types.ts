export enum Create {
  name = "name",
  email = "email",
  password = "password",
  role = "role",
  description = "description",
}

export interface CreateInput {
  [Create.name]: string;
  [Create.email]: string;
  [Create.password]: string;
  [Create.role]: string;
  [Create.description]: string;
}
