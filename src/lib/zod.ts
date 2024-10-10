import { z } from "zod";

export const zString = () => z.string({ message: '*Obrigatório' })

export const zPassword = () => zString().min(8, { message: '*Mínimo de 8 caracteres' })

export const zEmail = () => zString().email()

export const zNumber = () => z.coerce.number({ message: '*Obrigatório' })

export const zBoolean = () => z.boolean({ message: '*Obrigatório' })

export const zRefine = ({ condicional, message, path }: { condicional: (form: any) => boolean, message: string, path: string[] }): (form: any, ctx: z.RefinementCtx) => any => (form, ctx) => {
  if (condicional(form)) return
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: message,
    path: path,
  })
}
