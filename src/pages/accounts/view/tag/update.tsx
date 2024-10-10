import { Form } from "@/components/Form";
import { Dialog } from "@/lib/dialog";
import { AlertTriangle, Check, Plus } from "lucide-react";

import { useForm } from "@/lib/form";
import { tagSchema } from "@/models/tag";
import { useRestState } from "@/hooks/state";
import { updateTag } from "@/api/tag";
import { State } from "@/components/State";
import { LoaderSpin } from "@/components/Loaders/Spin";
import { reload } from "@/hooks/reload";
import { TagFormFields } from "./form";
import { dialogEvent } from "@/hooks/dialog";

export const accountTagUpdateDialog = dialogEvent()

export function AccountTagUpdateDialog() {

  const state = useRestState()
  const [open, data] = accountTagUpdateDialog.use()

  const form = useForm({
    zodResolver: tagSchema,
    values: data
  })

  return (
    <Dialog open={open} onOpenChange={accountTagUpdateDialog.open}>
      <Dialog.Content className="sm:max-w-sm">
        <Dialog.Header>
          <Dialog.Title>
            Editar tag
          </Dialog.Title>
          <Dialog.Description>
            Preencha os campos para editar essa tag.
          </Dialog.Description>
        </Dialog.Header>
        <Form {...form} onSubmit={async (formData) => {

          state.loading()

          const { ok } = await updateTag(data?.uuid, formData)

          if (!ok) return state.error()

          reload('account-tags')

          await state.success()

          accountTagUpdateDialog.open(false)

        }}>
          <TagFormFields />
          <Form.Footer>
            <Form.BtnSubmit disabled={state.current != 'default'}>
              <State value={state.current}>
                <State.Default>
                  <Plus className="size-5" /> Editar tag
                </State.Default>
                <State.Loading>
                  Editando <LoaderSpin />
                </State.Loading>
                <State.Success>
                  Tag editada <Check className="size-5" />
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