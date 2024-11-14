import { z } from "zod";

export type UserSchemaTypes = z.infer<typeof UserSchema>;

export const UserSchema = z.object({
  name: z.string().min(3, {
    message: "Nome deve conter pelo menos 3 caracteres",
  }),
  email: z
    .string()
    .min(1, { message: "Email de usuário inválido" })
    .email({ message: "formato de email inválido" }),
  description: z.string().optional(),
  role: z
    .string()
    .min(4, { message: "tipo de usuário é obrigatório" })
    .max(7, { message: "tipo de usuário obrigatório" }),
  password: z
    .string()
    .min(8, { message: "senha deve conter pelo menos 8 caracteres" }),
});
