import { ReactNode } from "react";

export default function Grid({ children, mode = 'default' }: { children: ReactNode, mode?: 'card' | 'default' }) {

  return (
    <div className="flex flex-col gap-4 group"
      data-mode={mode}
    >
      {children}
    </div>
  )

}

export function GridRow({ children }: { children: ReactNode }) {

  return (
    <div className="flex flex-col sm:flex-row gap-3 gap-y-3">
      {children}
    </div>
  )

}

Grid.Row = GridRow

export function GridTitle({ children }: { children: ReactNode }) {

  return (
    <h2 className="text-base mt-2 font-semibold">
      {children}
    </h2>
  )

}

Grid.Title = GridTitle

export function GridItem({ children, name, flex = 1 }: { children: ReactNode, name: string, flex?: number }) {

  return (
    <div className="flex flex-col gap-1 w-full" style={{ flex }}>
      <span className="text-sm opacity-70">
        {name}
      </span>
      <div
        className="dark:border-zinc-900 border rounded-lg w-full px-3 flex items-center h-10 leading-none group-data-[mode=card]:!border-border"
      >
        {
          children
            ? children
            : <span className="opacity-40 text-base">Não Informado</span>
        }
      </div>
    </div>
  )

}

Grid.Item = GridItem