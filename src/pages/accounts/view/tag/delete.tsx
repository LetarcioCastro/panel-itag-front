import { Dialog } from "@/lib/dialog";
import { AlertTriangle, Check, Trash } from "lucide-react";

import { useRestState } from "@/hooks/state";
import { deleteTag } from "@/api/tag";
import { State } from "@/components/State";
import { LoaderSpin } from "@/components/Loaders/Spin";
import { reload } from "@/hooks/reload";

import { dialogEvent } from "@/hooks/dialog";
import Grid from "@/components/DataGrid";
import { Button } from "@/components/ui/button";

export const accountTagDeleteDialog = dialogEvent()

export function AccountTagDeleteDialog() {

  const state = useRestState()
  const [open, data] = accountTagDeleteDialog.use()

  return (
    <Dialog open={open} onOpenChange={accountTagDeleteDialog.open}>
      <Dialog.Content className="sm:max-w-sm">
        <Dialog.Header>
          <Dialog.Title>
            Excluir tag
          </Dialog.Title>
          <Dialog.Description>  
            Realmente deseja excluir essa tag?
          </Dialog.Description>
        </Dialog.Header>
        <Grid>
          <Grid.Row>
            <Grid.Item name="Nome">
              {data?.alias}
            </Grid.Item>
          </Grid.Row>
        </Grid>
        <Dialog.Footer>
          <Button
            variant='destructive'
            disabled={state.current != 'default'}
            onClick={async () => {

              state.loading()

              const { ok } = await deleteTag(data?.uuid)

              if (!ok) return state.error()

              reload('account-tags')

              await state.success()

              accountTagDeleteDialog.open(false)

            }}
          >
            <State value={state.current}>
              <State.Default>
                <Trash className="size-5" /> Excluir tag
              </State.Default>
              <State.Loading>
                Excluindo <LoaderSpin />
              </State.Loading>
              <State.Success>
                Tag excluída <Check className="size-5" />
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