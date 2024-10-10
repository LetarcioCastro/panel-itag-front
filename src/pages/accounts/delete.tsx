
import { useRestState } from "@/hooks/state";
import { Dialog } from "@/lib/dialog";

import { ReactNode } from "react";

import { dialogEvent } from "@/hooks/dialog";
import { z } from "zod";
import { zPassword, zRefine } from "@/lib/zod";
import { accountModel } from "@/models/account";
import Grid from "@/components/DataGrid";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check, Trash } from "lucide-react";
import { State } from "@/components/State";
import { LoaderSpin } from "@/components/Loaders/Spin";
import { deleteAccount } from "@/api/account";
import { useNavigate } from "react-router-dom";

export const accountDeleteDialog = dialogEvent()

export const accountFormSchema = z.object({
  ...accountModel,
  password: zPassword().or(z.string().max(0).optional().nullable()),
  confirm_password: zPassword().or(z.string().max(0).optional().nullable()),
}).superRefine(zRefine({
  condicional: (form) => form.password == form.confirm_password,
  message: '*Senha invalida',
  path: ['confirm_password'],
}))

export function AccountDeleteDialog({ children, data = accountDeleteDialog.get() }: { children?: ReactNode, data?: any }) {

  const state = useRestState()

  const redirect = useNavigate()

  const [open] = accountDeleteDialog.use()

  return (
    <Dialog open={open} onOpenChange={accountDeleteDialog.open}>
      {children}
      <Dialog.Content className="sm:max-w-sm">
        <Dialog.Header>
          <Dialog.Title>
            Excluir conta
          </Dialog.Title>
          <Dialog.Description>
            Realmente deseja deletar essa conta?
          </Dialog.Description>
        </Dialog.Header>
        <Grid>
          <Grid.Row>
            <Grid.Item name="Email">
              {data?.email}
            </Grid.Item>
          </Grid.Row>
        </Grid>
        <Dialog.Footer>
          <Button
            disabled={state.current != 'default'}
            variant='destructive'
            onClick={async () => {

              state.loading()

              const { ok } = await deleteAccount(data?.uuid)

              if (!ok) return state.error()

              await state.success()

              accountDeleteDialog.open(false)
              redirect('/contas')

            }}
          >
            <State value={state.current}>
              <State.Default>
                <Trash className="size-5" /> Excluir
              </State.Default>
              <State.Loading>
                Excluindo <LoaderSpin />
              </State.Loading>
              <State.Success>
                Excluído <Check className="size-5" />
              </State.Success>
              <State.Error>
                Erro <AlertTriangle className="size-5" />
              </State.Error>
            </State>
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )

}