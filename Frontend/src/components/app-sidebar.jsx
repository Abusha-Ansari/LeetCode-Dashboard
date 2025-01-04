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
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LeetCodeContext } from "@/context/UserContext";
import { use } from "react";

export function AppSidebar({ ...props }) {
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
        title: "Dashboard",
        url: "dashboard",
      },
    ],
  };

  const { loggedIn, user, Logout } = React.useContext(LeetCodeContext);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="mt-3 mb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <span>{user ? user.username[0].toUpperCase() : "A"}</span>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium text-lg">
                    {user ? user.username.toUpperCase() : "LeetDash-User"}
                  </span>
                  <span className="text-sm">
                    {user ? user.college : "College"}
                  </span>
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
            {!loggedIn && (
              <>
                <SidebarMenuButton>
                  <Link to="login" className="">
                    <div className="text-lg">Login</div>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton>
                  <Link to="signin" className="">
                    <div className="text-lg">Sign Up</div>
                  </Link>
                </SidebarMenuButton>
              </>
            )}
            {loggedIn && (
              <>
                <SidebarMenuButton>
                  <Link to="" className="">
                    <div className="text-lg" onClick={Logout}>
                      Log Out
                    </div>
                  </Link>
                </SidebarMenuButton>
              </>
            )}
            {/* </SidebarMenuItem> */}
            {/* till here */}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
