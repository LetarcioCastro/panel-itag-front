import { createUser } from "@/api/user";
import { Form } from "@/components/Form";
import { Button } from "@/components/ui/button";
import { useRestState } from "@/hooks/state";
import { Dialog } from "@/lib/dialog";

import { useForm } from "@/lib/form";
import { zPassword, zRefine } from "@/lib/zod";
import { modelUser } from "@/models/user";
import { Plus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  ...modelUser,
  confirm_password: zPassword()
}).superRefine(zRefine({
  condicional: (form) => form.password == form.confirm_password,
  message: '*Senha invalida',
  path: ['confirm_password'],
}))

export function AddUserDialog() {

  const state = useRestState()

  const form = useForm({
    zodResolver: formSchema
  })

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>
          <Plus /> Criar usuário
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            Criar Usuário
          </Dialog.Title>
          <Dialog.Description>
            Crie um usuários preenchendo o formulários com dos dados referentes, email e senha.
          </Dialog.Description>
        </Dialog.Header>
        <Form 
          {...form}
          onSubmit={async (form) => {

            state.loading()

            const { ok } = await createUser(form)

            if(!ok) return state.error()

            await state.success()



          }}
          >
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
        </Form>
      </Dialog.Content>
    </Dialog>
  )

}