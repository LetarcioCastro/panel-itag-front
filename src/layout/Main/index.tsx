import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Main({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {

  return (
    <div className={cn("flex flex-col items-center flex-1 w-auto h-svh bg-white border-l border-border", className)} {...props}>
      {children}
    </div>
  )

}