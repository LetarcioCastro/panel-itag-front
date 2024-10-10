import { cn } from "@/utils";
import { HTMLAttributes } from "react";

export function LoaderSpin({ className, ...props }: HTMLAttributes<SVGSVGElement>) {

  return (
    <svg viewBox="25 25 50 50" className={cn("animate-spin origin-center size-6", className)} {...props}>
      <circle
        cx="50" cy="50" r="20"
        className="loader- fill-none stroke-primary-foreground stroke-[5]"
        style={{
          strokeDasharray: '2, 100',
          strokeDashoffset: '0',
          strokeLinecap: 'round',
          animation: 'loaderSpinDash 1.5s ease-in-out infinite'
        }}
      />
    </svg>
  )

}