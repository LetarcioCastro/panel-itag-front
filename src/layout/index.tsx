import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";
import { useMiddleware } from "@/hooks/auth";

export function LayoutApp() {

  if (useMiddleware()) return

  return (
    <div className='flex w-screen h-svh bg-background'>
      <Navbar />
      <div className='flex flex-1 relative'>
        <Outlet />
      </div>
    </div>
  )

}