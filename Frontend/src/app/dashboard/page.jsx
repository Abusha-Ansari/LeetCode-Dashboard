import { AppSidebar } from "@/components/app-sidebar";
import ModeToggle from "@/components/mode-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Header from "@/ownComponents/Header";
import { Outlet } from "react-router-dom";

function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-[4rem] items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
          </div>
          <span className="fixed left-[45%]">Welcome to LeetDash!</span>
          <div className="fixed right-1">
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
