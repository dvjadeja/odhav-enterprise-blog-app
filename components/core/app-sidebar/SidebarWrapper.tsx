import React from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import AppSidebar from "@/components/core/app-sidebar/AppSidebar";
import { Separator } from "@/components/ui/separator";
import SiteHeaderTitle from "@/components/core/app-sidebar/SiteHeaderTitle";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-10 shrink-0 items-center gap-2'>
          <div className='flex items-center gap-2 w-full'>
            <div className='flex items-center gap-2 pl-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator
                orientation='vertical'
                className='mr-2 data-[orientation=vertical]:h-4'
              />
            </div>
            <SiteHeaderTitle />
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarWrapper;
