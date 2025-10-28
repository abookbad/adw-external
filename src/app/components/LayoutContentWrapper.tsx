"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface LayoutContentWrapperProps {
  children: React.ReactNode;
}

export default function LayoutContentWrapper({ children }: LayoutContentWrapperProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const paddingClasses = isHomePage
    ? ""
    : "pb-40 sm:pb-44 md:pb-48 lg:pb-52 xl:pb-56";

  return <div className={paddingClasses}>{children}</div>;
}


