import { LogOut, Tag, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar({ }) {

  return (
    <div className="flex flex-col justify-between gap-6 w-64 p-4">
      <div className="flex flex-col gap-8">
        <div className="flex gap-1 items-end">
          <Tag className="size-6" /> <span className="text-2xl font-semibold"><span className="text-primary">IA</span>tag</span>
        </div>
        <div className="flex flex-col gap-2">
          <Link to={`/contas`} className="rounded-md font-semibold items-center text-md flex gap-2 text-foreground/70 hover:bg-foreground/5 px-2 -mx-2 py-2 hover:text-foreground">
            <Users className="text-foreground/60 size-5" /> Contas
          </Link>

        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Link to={`/login`} className="rounded-md font-semibold items-center text-md flex gap-2 text-foreground/70 hover:bg-foreground/5 px-2 -mx-2 py-2 hover:text-foreground">
          <LogOut className="text-foreground/60 rotate-180 size-5" /> Logout
        </Link>
      </div>
    </div>
  )

}