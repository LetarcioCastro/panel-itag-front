import { Form } from "@/components/Form";
import { zPassword, zRefine } from "@/lib/zod";
import { accountModel } from "@/models/account";
import { z } from "zod";

export const accountFormSchema = z.object({
  ...accountModel,
  confirm_password: zPassword()
}).superRefine(zRefine({
  condicional: (form) => form.password == form.confirm_password,
  message: '*Senha invalida',
  path: ['confirm_password'],
}))

export function AccountFormFields() {

  return (
    <>
      <Form.Row>
        <Form.Input name="name">
          Nome
        </Form.Input>
      </Form.Row>
      <Form.Row>
        <Form.Input name="email">
          Email
        </Form.Input>
      </Form.Row>
      <Form.Row>
        <Form.Password name="password">
          Senha
        </Form.Password>
      </Form.Row>
      <Form.Row>
        <Form.Password name="confirm_password">
          Confirma senha
        </Form.Password>
      </Form.Row>
    </>
  )

}