import { cn } from "@/utils";
import { createContext, HTMLAttributes, useContext } from "react";

type segmentProps = { value?: string | number | boolean }

const SegmentContext = createContext<segmentProps>({})

export function Segment({ className, value, children, ...props }: segmentProps & HTMLAttributes<HTMLDivElement>) {

  return (
    <SegmentContext.Provider value={{ value }}>
      <div className={cn("flex gap-3", className)} {...props}>
        {children}
      </div>
    </SegmentContext.Provider>
  )

}

export function SegmentButton({ children, value, className, ...props }: segmentProps & HTMLAttributes<HTMLButtonElement>) {

  const context = useContext(SegmentContext)

  const selected = context.value == value && value != undefined

  return (
    <button
      className={cn("border-b-2 border-transparent text-foreground/80 font-medium pb-1 px-3 hover:border-border data-[state=highlight]:border-primary data-[state=highlight]:text-foreground", className)} {...props}
      data-state={selected ? 'highlight' : 'default'}
    >
      {children}
    </button>
  )

}

Segment.Button = SegmentButton