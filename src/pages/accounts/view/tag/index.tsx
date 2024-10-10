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
import { Pencil, Trash } from "lucide-react"

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

import { Container } from "@/layout/Container"
import { useQuery } from "@/lib/query"
import { useReload } from "@/hooks/reload"
import { getAccountTags } from "@/api/account"
import { useRef, useState } from "react"

import { useParams } from "react-router-dom"
import { CreateAccountTag } from "./create"
import { accountTagUpdateDialog, AccountTagUpdateDialog } from "./update"
import { accountTagDeleteDialog, AccountTagDeleteDialog } from "./delete"

export type AccountType = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string,
  uuid: string,
}

export const columns: ColumnDef<AccountType>[] = [
  {
    accessorKey: "code",
    header: "SN do dispositivo",
    cell: ({ row }) => <div className="lowercase">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "alias",
    header: "Nome",
    cell: ({ row }) => <div className="lowercase">{row.getValue("alias")}</div>,
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => row.getValue('is_active') == 1 ? 'Ativo' : 'Inativo',
  },
  {
    id: "uuid",
    enableHiding: false,
    cell: ({ row }) => {

      return (
        <div className="w-full flex justify-end">
          <Button
            size='icon' variant='ghost' className="-my-2"
            onClick={() => accountTagUpdateDialog.open(true, row.original)}
          >
            <Pencil className="size-5" />
          </Button>
          <Button
            
            size='icon' variant='ghost' className="-my-2 text-destructive hover:text-destructive"
            onClick={() => accountTagDeleteDialog.open(true, row.original)}
          >
            <Trash className="size-5" />
          </Button>
        </div>
      )
    },
  },
]

export function AccountTagsPage() {

  const [code, setCode] = useState('')
  const [alias, setAlias] = useState('')

  const intervalRef = useRef<any>()

  const { id = '' } = useParams()

  const users = useQuery({
    keys: ['account-tags'],
    deps: [useReload('account-tags'), code, alias],
    default: [],
    fetch: async () => {

      const { data } = await getAccountTags(id, { code, alias })

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
    <Container>
      <h2 className="font-semibold text-2xl">
        Tags
      </h2>
      <div className="flex items-center justify-between gap-4 py-4">
        <div className="flex gap-3 ">
          <Input
            placeholder="Pesquisar por SN"
            onChange={(event) => {
              clearTimeout(intervalRef.current)
              intervalRef.current = setTimeout(() => {

                setCode(event.target.value)

              }, 300)
            }}
            className="max-w-[240px]"
          />
          <Input
            placeholder="Pesquisar por nome"
            onChange={(event) => {
              clearTimeout(intervalRef.current)
              intervalRef.current = setTimeout(() => {

                setAlias(event.target.value)

              }, 300)
            }}
            className="max-w-[240px]"
          />
        </div>
        <CreateAccountTag />
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
      <AccountTagUpdateDialog />
      <AccountTagDeleteDialog />
    </Container>
  )
}
