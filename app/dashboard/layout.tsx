import React from "react";

import QueryClientProvider from "@/components/provider/QueryClientProvider";
import SidebarWrapper from "@/components/core/app-sidebar/SidebarWrapper";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider>
      <SidebarWrapper>{children}</SidebarWrapper>
    </QueryClientProvider>
  );
};

export default DashboardLayout;
