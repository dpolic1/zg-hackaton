import { Overlay } from "@/components/elements";
import { Button } from "@/components/ui/button";
import { useDisclosure } from "@/hooks";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers";
import { TRole } from "@/types";
import { hasRole } from "@/utils/auth-utils";
import { EyeIcon, HomeIcon, LanguagesIcon, UserIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../logo/Logo";
import { HeaderSidebar } from "./HeaderSidebar";

type THeaderItem =
  | {
      /* Link */
      id: string;
      title: string;
      href: string;
      icon?: React.ReactNode;
      allowedRoles?: TRole[];
      isPublic: boolean;
    }
  | {
      /* Button with children */
      id: string;
      title?: string;
      icon?: React.ReactNode;
      allowedRoles: TRole[];
      children?: React.ReactNode;
      isPublic: boolean;
      onClick?: () => void;
    };

type TSidebarProps = {
  className?: string;
};

export function Header({ className }: TSidebarProps) {
  // state
  const [openItem, setOpenItem] = useState<number | null>(null);

  // hooks
  const { user } = useAuth();
  const { open: openSidebar, isOpen: isSidebarOpen, close: closeSidebar } = useDisclosure();

  console.log("sidebar", isSidebarOpen);

  // data
  const headerItems: THeaderItem[] = useMemo(
    () => [
      { id: "Home", title: "Home", href: "/", icon: <HomeIcon size={16} />, isPublic: true },
      {
        id: "Admin",
        title: "Admin",
        href: "/admin",
        icon: <EyeIcon size={16} />,
        allowedRoles: ["ROLE_ADMIN"],
        isPublic: false,
      },
      {
        id: "Languages",
        icon: <LanguagesIcon size={16} />,
        allowedRoles: ["ROLE_USER"],
        isPublic: true,
        children: (
          <div className="absolute top-0 right-0 flex flex-col gap-1 mt-3 bg-background p-4 w-full rounded-md min-w-min">
            <Button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md">
              English
            </Button>
            <Button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md">
              Croatian
            </Button>
          </div>
        ),
      },
      {
        id: "Profile",
        icon: <UserIcon size={16} />,
        allowedRoles: ["ROLE_USER"],
        isPublic: false,
        onClick: () => openSidebar(),
      },
    ],
    [openSidebar]
  );

  // methods
  const canDisplayItem = (item: THeaderItem) => {
    if (item.isPublic) return true;
    else if (!user) return false;

    return hasRole(user, item.allowedRoles);
  };

  return (
    <>
      <header className={cn(className, "z-40")}>
        <nav className="flex justify-between gap-3">
          <Logo>
            <Link to="/" className="px-4 py-2 text-lg text-">
              App
            </Link>
          </Logo>

          <ul className="flex gap-1">
            {headerItems.map(
              (item, index) =>
                canDisplayItem(item) && (
                  <li key={item.id}>
                    {"href" in item ? (
                      <Link
                        to={item.href}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md"
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    ) : (
                      <div>
                        <Button
                          onClick={
                            item.onClick ? item.onClick : () => setOpenItem(openItem === index ? null : index)
                          }
                          variant={"ghost"}
                          className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md"
                        >
                          {item.icon}
                          {item.title}
                        </Button>
                        {openItem === index && item.children && (
                          <div className="relative">{item.children}</div>
                        )}
                      </div>
                    )}
                  </li>
                )
            )}
          </ul>
        </nav>
      </header>

      {/* Sidebar */}
      <Overlay isOpen={isSidebarOpen} onClose={closeSidebar}>
        <HeaderSidebar onClose={closeSidebar} />
      </Overlay>
    </>
  );
}
