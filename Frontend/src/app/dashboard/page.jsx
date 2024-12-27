import { AppSidebar } from "@/components/app-sidebar";
import ModeToggle from "@/components/mode-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-[5rem] items-center justify-between border-b px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
          </div>

          <span className="text-xl font-bold text-center flex-1 sm:text-2xl lg:text-4xl xl:text-5xl">
            Welcome to LeetDash!
          </span>

          <div className="flex items-center">
            <ModeToggle />
          </div>
        </header>

        <div className="flex items-center justify-center flex-col flex-grow">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Page;
