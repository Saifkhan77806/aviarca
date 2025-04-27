'use client';
import * as React from "react"
import { ChevronRight } from "lucide-react"
import { useMemo } from "react";

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link";

// This is sample data.


const defaultData = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Notice",
          url: "/notice",
        }

      ],
    },
    {
      title: "Report",
      url: "#",
      items: [
        {
          title: "Salary",
          url: "/salary",
        },
        {
          title: "order",
          url: "/order",
        },
        {
          title: "Attendance",
          url: "/attendance",
        }
      ],
    },
    {
      title: "New",
      url: "#",
      items: [
        {
          title: "Create Emp",
          url: "/new-emp",
        }
      ],
    },
    {
      title: "Sales",
      url: "#",
      items: [
        {
          title: "Add & View sales",
          url: "/sales"
        },
      ]
    }

  ],
}

const managerData = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Notice",
      url: "#",
      items: [
        {
          title: "Notice board",
          url: "/manager/notice",
        }
      ],
    },
    {
      title: "Stocks",
      url: "#",
      items: [
        {
          title: "Add stock",
          url: "/manager/add-stock",
        },
        {
          title: "View stock",
          url: "/manager/view-stock",
        }
      ],
    },
    {
      title: "Raw material",
      url: "#",
      items:[
        {
          title: "Add",
          url: "/manager/add-rm-bill",
        },
        {
          title: "View",
          url: "/manager/view-rm-bill"
        }
      ]
    },
    {
      title: "Reports",
      url: "#",
      items: [
        {
          title: "Attendance summary",
          url: "/manager/attendance-report"
        },
        {
          title: "Sales summary",
          url: "/manager/sales-report"
        },
        {
          title: "Inventory report",
          url: "/manager/inventory-report"
        }
      ],
    },
    {
      title: "Payment",
      url: "#",
      items: [
        {
          title: "Stocks payment",
          url: "/manager/stock-payment"
        },
        {
          title: "Employee payment",
          url: "/manager/salary"
        }
      ]
    },
    {
      title: "Sales",
      url: "#",
      items: [
        {
          title: "Add & View sales",
          url: "/sales"
        },
      ]
    }


  ],
}

const empData = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Attendance",
      url: "#",
      items: [
        {
          title: "Give attendance",
          url: "/employee/give-attendance",
        }

      ],
    },
    {
      title: "Notices",
      url: "/employee/access-notice",
      items: [
        {
          title: "Access notice",
          url: "/employee/access-notice",
        }
      ],
    },
    {
      title: "Salary & Bonuses",
      url: "#",
      items: [
        {
          title: "View salary",
          url: "/employee/salary",
        }
      ],
    },
    {
      title: "View bonus",
      url: "#",
      items:[
        {
          title: "Add",
          url: "/employee/bonus",
        }


  ],

}
  ]}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const pathname = usePathname();

  const data = useMemo(() => {
    return pathname.startsWith("/manager") ? managerData : pathname.startsWith("/employee") ? empData : defaultData;
  }, [pathname])

 




  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
      <SidebarGroupContent>
        <SidebarMenuItem >
          <SidebarMenuButton isActive={pathname == "/dashboard" ? true : false}>
            <Link href={"/dashboard"}>Dashboard</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarGroupContent>
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={pathname == item.url ? true : false}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
