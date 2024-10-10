import { cn } from "@/utils";
import { HTMLAttributes } from "react";

export function Container({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {

  return (
    <div className={cn("flex flex-col container xl:max-w-screen-xl px-4 py-5", className)} {...props}>
      {children}
    </div>
  )

}