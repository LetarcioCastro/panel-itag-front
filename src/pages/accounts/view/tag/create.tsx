import { Form } from "@/components/Form";
import { Dialog } from "@/lib/dialog";
import { AlertTriangle, Check, Plus } from "lucide-react";

import { useForm } from "@/lib/form";
import { tagSchema } from "@/models/tag";
import { useRestState } from "@/hooks/state";
import { createTag } from "@/api/tag";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { State } from "@/components/State";
import { LoaderSpin } from "@/components/Loaders/Spin";
import { reload } from "@/hooks/reload";
import { TagFormFields } from "./form";
import { useAccountContext } from "@/contexts/account";

export function CreateAccountTag() {

  const { account } = useAccountContext()

  const state = useRestState()

  const form = useForm({
    zodResolver: tagSchema,
    values: {
      is_active: 1,
    }
  })

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button>
          <Plus /> Registrar tag
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-sm">
        <Dialog.Header>
          <Dialog.Title>
            Registrar tag
          </Dialog.Title>
          <Dialog.Description>
            Preencha os campos para registrar uma tag.
          </Dialog.Description>
        </Dialog.Header>
        <Form {...form} onSubmit={async (formData) => {

          state.loading()

          const { ok } = await createTag({
            ...formData,
            account_id: account?.data?.id,
          })

          if (!ok) return state.error()

          reload('account-tags')

          await state.success()
          form.reset()
          setOpen(false)

        }}>
          <TagFormFields />
          <Form.Footer>
            <Form.BtnSubmit disabled={state.current != 'default'}>
              <State value={state.current}>
                <State.Default>
                  <Plus className="size-5" /> Registrar tag
                </State.Default>
                <State.Loading>
                  Registrando <LoaderSpin />
                </State.Loading>
                <State.Success>
                  Tag registrada <Check className="size-5" />
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