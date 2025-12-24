"use client";

import React from "react";
import { usePathname } from "next/navigation";

const headerTitleMap = {
  "/dashboard": "Dashboard",
  "/dashboard/documents": "Documents",
  "/dashboard/documents/new": "New Document",
  "/dashboard/documents/edit": "Edit Document",
  "/dashboard/documents/view": "View Document",
  "/dashboard/articles": "Articles",
  "/dashboard/articles/new": "New Article",
  "/dashboard/articles/edit": "Edit Article",
  "/dashboard/articles/view": "View Article",
  "/dashboard/project-types": "Project Types",
  "/dashboard/project-types/new": "New Project Type",
  "/dashboard/project-types/edit": "Edit Project Type",
  "/dashboard/project-types/view": "View Project Type",
};

const SiteHeaderTitle = () => {
  const pathname = usePathname();
  const title = headerTitleMap[pathname as keyof typeof headerTitleMap];
  return (
    <div>
      <h1 className='text-base font-medium'>{title}</h1>
    </div>
  );
};

export default SiteHeaderTitle;
