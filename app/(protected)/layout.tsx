import { AppSidebar } from "@/components/app-sidebar";
import { UserButton } from "@/components/blocks/user-button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { serverUser } from "@/lib/auth";
import { ClientUser } from "@/lib/client-user";
import React from "react";
import { Toaster } from "sonner";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await serverUser();

  console.log("client user", user);
  return (
    <div>
      <SidebarProvider>
        <AppSidebar role={user?.role} />
        <SidebarInset>
          <header className="bg-background sticky justify-between top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <UserButton />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </div>
  );
};

export default layout;
