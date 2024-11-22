import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers";
import { LayoutDashboardIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

const SidebarHeader = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-start gap-4">
      <img src={"/default-user-avatar.png"} alt={user?.firstName} className="w-10 h-10 rounded-full" />

      <div className="-mt-1">
        <p className="text-lg font-semibold">{user?.username}</p>
        <p className="text-sm text-muted-foreground">{user?.roles}</p>
      </div>
    </header>
  );
};

const SidebarNav = ({ onClose }: TSidebarFooterProps) => {
  const navItems = [
    {
      id: "Dashboard",
      title: "Dashboard",
      icon: <LayoutDashboardIcon size={16} />,
      href: "/",
    },
    {
      id: "Settings",
      title: "Settings",
      icon: <SettingsIcon size={16} />,
      href: "/settings",
    },
    {
      id: "Profile",
      title: "Profile",
      icon: <UserIcon size={16} />,
      href: "/profile",
    },
  ];

  return (
    <nav className="mt-10">
      <ul className="flex flex-col gap-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.href}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black rounded-md"
              onClick={onClose}
            >
              {item.icon}
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

type TSidebarFooterProps = {
  onClose: () => void;
};

const SidebarFooter = ({ onClose }: TSidebarFooterProps) => {
  const { logout } = useAuth();

  return (
    <footer className="absolute bottom-0 left-0 right-0 px-10 py-5">
      <div className="flex justify-between gap-5">
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={async () => {
            try {
              await logout();
              onClose();
            } catch (error) {
              if (error instanceof Error) {
                console.error(error);
              }
            }
          }}
        >
          Logout
        </Button>
      </div>
    </footer>
  );
};

type THeaderSidebarProps = {
  onClose: () => void;
};

export function HeaderSidebar({ onClose }: THeaderSidebarProps) {
  return (
    <aside className="fixed top-0 right-0 bottom-0 min-h-screen p-10 bg-background z-50 w-full max-w-96">
      <SidebarHeader />
      <SidebarNav onClose={onClose} />
      <SidebarFooter onClose={onClose} />
    </aside>
  );
}
