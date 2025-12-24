"use client";

import React from "react";

import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Command,
  Construction,
  LayoutDashboard,
  LifeBuoy,
  Newspaper,
  Send,
  Users,
} from "lucide-react";
import { NavMain } from "@/components/core/app-sidebar/NavMain";
import { NavSecondary } from "@/components/core/app-sidebar/NavSecondary";
import { NavUser } from "@/components/core/app-sidebar/NavUser";

// Menu items.
const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Articles",
    url: "/dashboard/articles",
    icon: Newspaper,
  },
  {
    title: "Project Types",
    url: "/dashboard/project-types",
    icon: Construction,
  },
  {
    title: "Clients",
    url: "/dashboard/clients",
    icon: Users,
  },
];

const data = {
  user: {
    name: "Dilipsinh Jadeja",
    email: "m@example.com",
    avatar: "https://avatars.githubusercontent.com/u/70471636",
  },
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

const AppSidebar = () => {
  const pathname = usePathname();
  // Dynamically set isActive based on current route
  const items = menuItems.map((item) => ({
    ...item,
    isActive: pathname === item.url,
  }));

  return (
    <Sidebar variant='inset' collapsible='icon'>
      <SidebarHeader>
        <SidebarMenuButton size='lg' asChild>
          <div>
            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
              <Command className='size-4' />
            </div>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold text-xl'>Odhav CMS</span>
              <span className='truncate text-xs'>Enterprise</span>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={items} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
