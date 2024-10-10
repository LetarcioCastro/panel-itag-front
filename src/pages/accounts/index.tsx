"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Main } from "@/layout/Main"
import { Container } from "@/layout/Container"
import { useQuery } from "@/lib/query"
import { useReload } from "@/hooks/reload"
import { getAccounts } from "@/api/account"
import { useRef, useState } from "react"
import { CreateAccountDialog } from "./create"
import { Link } from "react-router-dom"

export type AccountType = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string,
  uuid: string,
}

export const columns: ColumnDef<AccountType>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "is_active",
    header: "Ativo",
    cell: ({ row }) => row.getValue('is_active') == 1 ? 'Sim' : 'Não',
  },
  {
    id: "uuid",
    enableHiding: false,
    cell: ({ row }) => {
  
      return (
        <div className="w-full flex justify-end">
          <Button size='icon' variant='link' className="-my-2" asChild>
            <Link to={`/contas/${row.original?.uuid}`}>
              <ExternalLink className="" />
            </Link>
          </Button>
        </div>
      )
    },
  },
]

export function AccountsPage() {

  const [search, setSearch] = useState('')
  const intervalRef = useRef<any>()

  const users = useQuery({
    keys: ['accounts'],
    deps: [useReload('accounts'), search],
    default: [],
    fetch: async () => {

      const { data } = await getAccounts({ name: search })

      return data.response?.data || []

    }
  })

  const table = useReactTable({
    data: users.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <Main>
      <Container>
        <h2 className="font-semibold text-2xl">
          Contas
        </h2>
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Pesquisar por nome"
            onChange={(event) => {

              clearTimeout(intervalRef.current)

              intervalRef.current = setTimeout(() => {

                setSearch(event.target.value)

              }, 300)

            }}
            className="max-w-sm"
          />
          <CreateAccountDialog />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </Main>
  )
}
