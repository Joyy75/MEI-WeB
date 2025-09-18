

export const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Departments",
    href: "/departments",
    submenu: [
      { label: "Public Relations & Partnerships", href: "/departments/partnership" },
      { label: "Human Resources", href: "/departments/hr" },
      { label: "Education Department", href: "/departments/education" },
      { label: "Project Development", href: "/departments/project" },
      { label: "Student Engagement & Development", href: "/departments/affairs" },
      { label: "General Administration", href: "/departments/admin" },
      { label: "Information Technology", href: "/departments/it" },
  
    ],
  },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  {
    label: "Volunteers",
    href: "/volunteers",
    submenu: [
      { label: "All Members", href: "/members" },
      { label: "Become a Volunteer", href: "/volunteers/create" },
    ],
  },
  { label: "Contacts", href: "/contact" },
];