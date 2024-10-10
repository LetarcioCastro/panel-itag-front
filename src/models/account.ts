import { zEmail, zPassword, zString } from "@/lib/zod";
import { z } from "zod";

export const accountModel = {
  name: zString(),
  email: zEmail(),
  password: zPassword(),
}

export const accountSchema = z.object(accountModel)

export type userType = z.infer<typeof accountSchema>

