import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const data = {
  navMain: [
    {
      title: "Home",
      url: "",
    },
    {
      title: "AddProfile",
      url: "addprofile",
    },
    {
      title: "About",
      url: "about",
    },
    {
      title: "Login",
      url: "login",
    },
    {
      title: "Sign-Up",
      url: "signin",
    },,
    {
      title: "Dashboard",
      url: "dashboard",
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium text-lg">LeetDash-USER</span>
                  <span className="text-sm">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={`${item.url}`} className="">
                    <div className="text-lg">{item.title}</div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {/* To add extra buttons in sidebar */}
            {/* <SidebarMenuItem> */}
            <SidebarMenuButton>
              <Link to={`test`} className="">
                <div className="text-lg">test</div>
              </Link>
            </SidebarMenuButton>
            {/* </SidebarMenuItem> */}
            {/* till here */}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
