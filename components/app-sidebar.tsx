"use client";

import * as React from "react";
import {
  AudioWaveform,
  BadgeIndianRupee,
  BookOpen,
  Bot,
  Calendar1,
  Command,
  ContactRound,
  Flag,
  FolderOpenDot,
  Frame,
  GalleryVerticalEnd,
  LayoutPanelLeft,
  MailCheckIcon,
  Map,
  PieChart,
  ReceiptIndianRupee,
  ReceiptText,
  Settings2,
  SquareTerminal,
  StickyNote,
  UserRoundCog,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  let data;

  if (props.role === "EMPLOYEE") {
    // EMPLOYEE
    data = {
      user: {
        name: "Employee",
        email: "employee@example.com",
        avatar: "/avatars/shadcn.jpg",
      },
      teams: [
        {
          name: "Acme Inc",
          logo: GalleryVerticalEnd,
          plan: "Enterprise",
        },
        {
          name: "Acme Corp.",
          logo: AudioWaveform,
          plan: "Startup",
        },
        {
          name: "Evil Corp.",
          logo: Command,
          plan: "Free",
        },
      ],
      navMain: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutPanelLeft,
        },
        {
          title: "Notice",
          url: "/notice",
          icon: Flag,
        },
        {
          title: "Task",
          url: "/task",
          icon: StickyNote,
        },
        {
          title: "Salary",
          url: "/salaryslip",
          icon: BadgeIndianRupee,
        },
        {
          title: "Attendance",
          url: "/attendance",
          icon: Calendar1,
        },
        {
          title: "Setting",
          url: "/setting",
          icon: Settings2,
        },
        {
          title: "Playground",
          url: "#",
          icon: SquareTerminal,
          isActive: true,
          items: [
            {
              title: "History",
              url: "#",
            },
            {
              title: "Starred",
              url: "#",
            },
            {
              title: "Settings",
              url: "#",
            },
          ],
        },
      ],
      projects: [
        {
          name: "Design Engineering",
          url: "#",
          icon: Frame,
        },
        {
          name: "Sales & Marketing",
          url: "#",
          icon: PieChart,
        },
        {
          name: "Travel",
          url: "#",
          icon: Map,
        },
      ],
    };
  } else if (props.role === "MANAGER") {
    // MANAGER
    data = {
      user: {
        name: "Manager",
        email: "manager@example.com",
        avatar: "/avatars/shadcn.jpg",
      },

      navMain: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutPanelLeft,
        },
        {
          title: "Notice",
          url: "/notice",
          icon: Flag,
        },
        {
          title: "Task",
          url: "/task",
          icon: StickyNote,
        },
        {
          title: "Salary",
          url: "/salaryslip",
          icon: BadgeIndianRupee,
        },
        {
          title: "Attendance",
          url: "/attendance",
          icon: Calendar1,
        },
        {
          title: "Projects",
          url: "/project-sections",
          icon: FolderOpenDot,
          items: [
            {
              title: "Project",
              url: "/project",
            },
            {
              title: "Assigned Project",
              url: "/assigned-project",
            },
            {
              title: "Project Payment",
              url: "project-payment",
            },
          ],
        },
        {
          title: "Edit Salary",
          url: "/edit-emp-salary",
          icon: ReceiptText,
        },
        {
          title: "Billing",
          url: "/billing",
          icon: ReceiptIndianRupee,
        },
        {
          title: "Meeting",
          url: "/meeting",
          icon: ContactRound,
        },
        {
          title: "Employee Management",
          url: "/emp-management",
          icon: UserRoundCog,
        },
        {
          title: "Setting",
          url: "/setting",
          icon: Settings2,
        },
      ],
      projects: [
        {
          name: "Design Engineering",
          url: "#",
          icon: Frame,
        },
        {
          name: "Sales & Marketing",
          url: "#",
          icon: PieChart,
        },
        {
          name: "Travel",
          url: "#",
          icon: Map,
        },
      ],
    };
  } else if (props.role === "OWNER") {
    // OWNER
    data = {
      user: {
        name: "Owner",
        email: "owner@example.com",
        avatar: "/avatars/shadcn.jpg",
      },
      navMain: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutPanelLeft,
        },
        {
          title: "Notice",
          url: "/notice",
          icon: Flag,
        },
        {
          title: "Task",
          url: "/task",
          icon: StickyNote,
        },
        {
          title: "Salary",
          url: "/salaryslip",
          icon: BadgeIndianRupee,
        },
        {
          title: "Attendance",
          url: "/attendance",
          icon: Calendar1,
        },
        {
          title: "Projects",
          url: "/project-sections",
          icon: FolderOpenDot,
          items: [
            {
              title: "Project",
              url: "/project",
            },
            {
              title: "Assigned Project",
              url: "/assigned-project",
            },
            {
              title: "Project Payment",
              url: "project-payment",
            },
          ],
        },
        {
          title: "Edit Salary",
          url: "/edit-salary",
          icon: ReceiptText,
        },
        {
          title: "Billing",
          url: "/billing",
          icon: ReceiptIndianRupee,
        },
        {
          title: "Meeting",
          url: "/meeting",
          icon: ContactRound,
        },
        {
          title: "Manager",
          url: "/user-management",
          icon: UserRoundCog,
        },
        {
          title: "Setting",
          url: "/setting",
          icon: Settings2,
        },
      ],
      projects: [
        {
          name: "Design Engineering",
          url: "#",
          icon: Frame,
        },
        {
          name: "Sales & Marketing",
          url: "#",
          icon: PieChart,
        },
        {
          name: "Travel",
          url: "#",
          icon: Map,
        },
      ],
    };
  } else {
    // ADMIN
    data = {
      user: {
        name: "Admin",
        email: "admin@example.com",
        avatar: "/avatars/shadcn.jpg",
      },
      navMain: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutPanelLeft,
        },
        {
          title: "Notice",
          url: "/notice",
          icon: Flag,
        },
        {
          title: "Salary",
          url: "/salaryslip",
          icon: BadgeIndianRupee,
        },
        {
          title: "Attendance",
          url: "/attendance",
          icon: Calendar1,
        },
        {
          title: "Projects",
          url: "/project-sections",
          icon: FolderOpenDot,
          items: [
            {
              title: "Project",
              url: "/project",
            },
            {
              title: "Assigned Project",
              url: "/assigned-project",
            },
            {
              title: "Project Payment",
              url: "project-payment",
            },
          ],
        },
        {
          title: "Edit Salary",
          url: "/edit-salary",
          icon: ReceiptText,
        },
        {
          title: "Billing",
          url: "/billing",
          icon: ReceiptIndianRupee,
        },
        {
          title: "Mail Box",
          url: "/mailbox",
          icon: MailCheckIcon,
        },
        {
          title: "Meeting",
          url: "/meeting",
          icon: ContactRound,
        },
        {
          title: "Manager",
          url: "/user-management",
          icon: UserRoundCog,
        },
        {
          title: "Setting",
          url: "/setting",
          icon: Settings2,
        },
      ],
      projects: [
        {
          name: "Design Engineering",
          url: "#",
          icon: Frame,
        },
        {
          name: "Sales & Marketing",
          url: "#",
          icon: PieChart,
        },
        {
          name: "Travel",
          url: "#",
          icon: Map,
        },
      ],
    };
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
