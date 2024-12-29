import { AppSidebar } from "@/components/app-sidebar";
import ModeToggle from "@/components/mode-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LeetCodeContext } from "@/context/UserContext";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

function Page() {

  const {userStats , loggedIn} = useContext(LeetCodeContext);
  
  useEffect(() => {
     const test = async () => {
      const data = await userStats;
      console.log(data)
    }
    test();
  }, [loggedIn])

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
