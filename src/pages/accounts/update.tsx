import { Form } from "@/components/Form";
import { State } from "@/components/State";
import { reload } from "@/hooks/reload";
import { useRestState } from "@/hooks/state";
import { Dialog } from "@/lib/dialog";
import { useForm } from "@/lib/form";
import { AlertTriangle, Check, Pencil } from "lucide-react";
import { ReactNode } from "react";
import { AccountFormFields } from "./form";
import { LoaderSpin } from "@/components/Loaders/Spin";
import { dialogEvent } from "@/hooks/dialog";
import { z } from "zod";
import { zPassword, zRefine } from "@/lib/zod";
import { accountModel } from "@/models/account";
import { updateAccount } from "@/api/account";

export const accountUpdateDialog = dialogEvent()

export const accountFormSchema = z.object({
  ...accountModel,
  password: zPassword().or(z.string().max(0).optional().nullable()),
  confirm_password: zPassword().or(z.string().max(0).optional().nullable()),
}).superRefine(zRefine({
  condicional: (form) => form.password == form.confirm_password,
  message: '*Senha invalida',
  path: ['confirm_password'],
}))

export function AccountUpdateDialog({ children, ...props }: { children?: ReactNode, data?: any }) {

  const state = useRestState()

  const [open, data] = accountUpdateDialog.use()

  const account = props.data || data

  const form = useForm({
    zodResolver: accountFormSchema,
    values: account
  })

  return (
    <Dialog open={open} onOpenChange={accountUpdateDialog.open}>
      {children}
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            Editar Conta
          </Dialog.Title>
          <Dialog.Description>
            Edite uma conta de acesso preenchendo o formulários com dos dados referentes, nome e email.
          </Dialog.Description>
        </Dialog.Header>
        <Form
          {...form}
          onSubmit={async (form) => {

            state.loading()

            const { ok } = await updateAccount(account?.uuid, form)

            if (!ok) return state.error()

            reload('accounts')
            reload('account')

            await state.success()
            accountUpdateDialog.open(false)

          }}
        >
          <AccountFormFields />
          <Form.Footer>
            <Form.BtnSubmit disabled={state.current != 'default'}>
              <State value={state.current}>
                <State.Default>
                  Editar conta <Pencil className="size-5" />
                </State.Default>
                <State.Loading>
                  Editando <LoaderSpin />
                </State.Loading>
                <State.Success>
                  Editado <Check className="size-5" />
                </State.Success>
                <State.Error>
                  Erro <AlertTriangle className="size-5" />
                </State.Error>
              </State>
            </Form.BtnSubmit>
          </Form.Footer>
        </Form>
      </Dialog.Content>
    </Dialog>
  )

}