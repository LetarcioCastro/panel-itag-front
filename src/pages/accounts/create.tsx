import { Form } from "@/components/Form";
import { State } from "@/components/State";
import { Button } from "@/components/ui/button";
import { reload } from "@/hooks/reload";
import { useRestState } from "@/hooks/state";
import { Dialog } from "@/lib/dialog";
import { useForm } from "@/lib/form";
import { AlertTriangle, Check, Plus } from "lucide-react";
import { useState } from "react";
import { AccountFormFields, accountFormSchema } from "./form";
import { LoaderSpin } from "@/components/Loaders/Spin";
import { createAccount } from "@/api/account";

export function CreateAccountDialog() {

  const state = useRestState()

  const form = useForm({
    zodResolver: accountFormSchema
  })

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>
          <Plus /> Criar conta
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            Criar Conta
          </Dialog.Title>
          <Dialog.Description>
            Crie uma conta de acesso preenchendo o formulários com dos dados referentes, email e senha.
          </Dialog.Description>
        </Dialog.Header>
        <Form
          {...form}
          onSubmit={async (formData) => {

            state.loading()

            const { ok } = await createAccount(formData)

            if (!ok) return state.error()

            reload('accounts')

            await state.success()
            form.reset()
            setOpen(false)

          }}
        >
          <AccountFormFields />
          <Form.Footer>
            <Form.BtnSubmit disabled={state.current != 'default'}>
              <State value={state.current}>
                <State.Default>
                  <Plus /> Criar conta
                </State.Default>
                <State.Loading>
                  Criando <LoaderSpin />
                </State.Loading>
                <State.Success>
                  Criado <Check />
                </State.Success>
                <State.Error>
                  Erro <AlertTriangle />
                </State.Error>
              </State>
            </Form.BtnSubmit>
          </Form.Footer>
        </Form>
      </Dialog.Content>
    </Dialog>
  )

}