import { zEmail, zPassword } from "@/lib/zod";
import { z } from "zod";

export const modelUser = {
  email: zEmail(),
  password: zPassword(),
}

export const schemaUser = z.object(modelUser)

export type userType = z.infer<typeof schemaUser>

