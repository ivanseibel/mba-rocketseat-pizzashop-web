import { Pizza } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-foreground/5 border-r bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-foreground text-lg">
          <Pizza className="h-5 w-5" />
          <span className="font-semibold">pizza.shop</span>
        </div>
        <footer className="text-sm">
          &copy; {new Date().getFullYear()} pizza.shop All rights reserved.
        </footer>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
