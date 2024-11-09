import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers";
import { TRole } from "@/types";
import { ContactIcon, EyeIcon, HomeIcon, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";

type TSidebarItem =
  | {
      title: string;
      href: string;
      icon: React.ReactNode;
      navPart: "top";
      allowedRoles?: TRole[];
    }
  | {
      title: string;
      href?: string;
      icon: React.ReactNode;
      navPart: "bottom";
      allowedRoles?: TRole[];
    };

const sidebarItems: TSidebarItem[] = [
  { title: "Home", href: "/", icon: <HomeIcon size={16} />, navPart: "top", allowedRoles: ["user"] },
  { title: "Admin", href: "/admin", icon: <EyeIcon size={16} />, navPart: "top", allowedRoles: ["admin"] },
  {
    title: "Contact",
    href: "/contact",
    icon: <ContactIcon size={16} />,
    navPart: "top",
    allowedRoles: ["user"],
  },
  { title: "Logout", icon: <LogOutIcon size={16} />, navPart: "bottom" },
];

type TSidebarProps = {
  className?: string;
};

export function Sidebar({ className }: TSidebarProps) {
  // hooks
  const { user, logout } = useAuth();

  // handlers
  const handleLogout = () => {
    logout();
  };

  return (
    <aside className={cn(className)}>
      <nav className="flex flex-col gap-3 h-full">
        <ul className="flex flex-col gap-1 overflow-y-auto">
          {sidebarItems.map(
            (item) =>
              item.navPart === "top" && (
                <li key={item.title}>
                  <Link
                    to={item.href}
                    className="flex gap-3 items-center px-4 py-2 rounded-md text-slate-400 font-semibold bg-slate-800 hover:bg-slate-800/75 transition-colors duration-100"
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </li>
              )
          )}
        </ul>

        <ul className="flex flex-col gap-1 mt-auto">
          {sidebarItems.map(
            (item) =>
              item.navPart === "bottom" && (
                <li key={item.title}>
                  <Button
                    className="flex w-full gap-3 items-center px-4 py-6 rounded-md text-lg text-slate-300 font-semibold bg-red-900 hover:bg-red-800 transition-colors duration-100"
                    onClick={handleLogout}
                  >
                    {item.icon}
                    {item.title}
                  </Button>
                </li>
              )
          )}
        </ul>
      </nav>
    </aside>
  );
}
