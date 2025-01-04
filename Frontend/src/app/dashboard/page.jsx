import { AppSidebar } from "@/components/app-sidebar";
import ModeToggle from "@/components/mode-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TextShimmer } from "@/components/ui/text-shimmer";
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
            <TextShimmer
              duration={1.2}
              className="text-4xl font-bold [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
            >
              LeetDash
            </TextShimmer>
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
