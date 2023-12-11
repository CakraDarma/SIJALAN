import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    // {
    //   title: "Informasi Jalan",
    //   href: "/maps",
    // },
  ],
  dashboardNav: [
    {
      title: "User",
      href: "#",
    },
    {
      title: "Project",
      href: "#",
    },
  ],
  sidebarNav: [
    {
      title: "Profil",
      href: "/profil",
      icon: "pura",
    },
    {
      title: "Upacara",
      href: "/upacara",
      icon: "upacara",
    },
    {
      title: "Kegiatan",
      href: "/kegiatan",
      icon: "kegiatan",
    },
    {
      title: "Inventaris",
      href: "/inventaris",
      icon: "inventory",
    },
    {
      title: "Virtual Tour",
      href: "/virtual-tour",
      icon: "virtualTour",
    },
    {
      title: "Pengaturan",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
};
