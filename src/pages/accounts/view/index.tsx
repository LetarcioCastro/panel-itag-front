import { getAccount } from "@/api/account";
import { Button } from "@/components/ui/button";
import { useReload } from "@/hooks/reload";
import { Container } from "@/layout/Container";
import { Main } from "@/layout/Main";
import { Dialog } from "@/lib/dialog";
import { useQuery } from "@/lib/query";
import { Pencil, Trash, User2 } from "lucide-react";
import { Link, Outlet, useLocation, useParams, useResolvedPath } from "react-router-dom";
import { AccountUpdateDialog } from "../update";
import { AccountDeleteDialog } from "../delete";
import { Segment } from "@/components/Segment";
import { AccountContext } from "@/contexts/account";

export const useAccount = (id: string) =>
  useQuery({
    keys: ['account', id],
    deps: [useReload('account')],
    fetch: async () => (await getAccount(id))?.data?.response
  })

export function AccountPage() {

  const { id = '' } = useParams()
  const account = useAccount(id)

  const path = useResolvedPath('')
  const location = useLocation()

  return (
    <Main className="h-full">
      <Container>
        <div className="flex gap-3 justify-between">
          <div className="flex gap-3 items-center">
            <div className="flex justify-center items-center size-16 bg-primary/20 rounded-lg">
              <User2 className="size-8 text-primary" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-medium">
                {account.data?.name}
              </h2>
              <span>
                {account.data?.email}
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <AccountUpdateDialog
              data={account.data}
            >
              <Dialog.Trigger asChild>
                <Button disabled={account.isLoading}>
                  <Pencil className="size-5" /> Editar conta
                </Button>
              </Dialog.Trigger>
            </AccountUpdateDialog>
            <AccountDeleteDialog
              data={account.data}
            >
              <Dialog.Trigger asChild>
                <Button disabled={account.isLoading} size='icon' variant='destructive'>
                  <Trash className="size-5" />
                </Button>
              </Dialog.Trigger>
            </AccountDeleteDialog>

          </div>
        </div>
      </Container>
      <div className="flex w-full justify-center border-b border-border">
        <Container className="py-0">
          <Segment value={location.pathname.replace(path.pathname, '')}>
            <Link to={''}>
              <Segment.Button tabIndex={-1} value={''}>
                Tags
              </Segment.Button>
            </Link>
            <Link to={'mapa'}>
              <Segment.Button tabIndex={-1} value={'/mapa'}>
                Mapa
              </Segment.Button>
            </Link>
          </Segment>
        </Container>
      </div>
      <AccountContext.Provider value={{ account }}>
        <Outlet />
      </AccountContext.Provider>
    </Main>
  )

}