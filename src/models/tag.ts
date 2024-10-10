import { zNumber, zString } from "@/lib/zod";
import { z } from "zod";

export const tagModel = {
  alias: zString(),
  code: zString(),
  is_active: zNumber().default(1),
  account_id: zNumber().optional().nullable()
}

export const tagSchema = z.object(tagModel)

export type tagType = z.infer<typeof tagSchema>