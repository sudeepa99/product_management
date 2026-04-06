import { Package2 } from "lucide-react";
import { ThemeToggle } from "../theme/theme-toggle";

export function AppHeader() {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
            {/* <Package2 className="h-5 w-5" /> */}
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">ProductHub</h1>
            <p className="text-sm text-muted-foreground">
              Manage products with a clean modern SaaS workflow
            </p>
          </div>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
