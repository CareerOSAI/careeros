import {
  House,
  Map,
  FileText,
  BriefcaseBusiness,
  Search,
  Bot,
  Settings,
} from "lucide-react";

export const sidebarItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: House,
  },
  {
    label: "Roadmap",
    href: "/roadmap",
    icon: Map,
  },
  {
    label: "CV Analyzer",
    href: "/cv-analyzer",
    icon: FileText,
  },
  {
    label: "Job Tracker",
    href: "/jobs",
    icon: BriefcaseBusiness,
  },
  {
    label: "Job Search",
    href: "/job-search",
    icon: Search,
  },
  {
    label: "AI Coach",
    href: "/ai-coach",
    icon: Bot,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];