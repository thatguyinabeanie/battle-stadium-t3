"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { ChildrenProps } from "~/types";
import { cn } from "~/lib/utils";
import { NavigationMenuItem } from "../ui/navigation-menu";
import { NavbarItemsConfigs } from "~/config/site";

interface NavbarLinksProps {
  isSignedIn: boolean | null;
}

export default function NavbarLinks ({ isSignedIn }: Readonly<NavbarLinksProps>) {
  const pathname = usePathname();
  const firstSegment = pathname?.split("/")[1];

  return (
    <>
    {
        NavbarItemsConfigs.map(({ key, label }) => (
          <NavbarClientLink
            key={ key }
            firstSegment={ firstSegment }
            path={ key }
          >
            { label }
          </NavbarClientLink>
        ))
    }

      <NavbarClientLink
        className={ cn("hidden", {
          "sm:flex": isSignedIn,
        }) }
        firstSegment={ firstSegment }
        path="dashboard"
      >
        Dashboard
      </NavbarClientLink>
    </>
  );
}


interface NavbarItemClientProps extends ChildrenProps {
  path: string;
  className?: string;
  firstSegment?: string;
}
const LINK_CLASSNAMES =
  "flex text-lg transition-transform duration-200 ease-in-out transform hover:scale-105 text-primary";

function NavbarClientLink ({
  path,
  children,
  className,
  // firstSegment,
}: Readonly<NavbarItemClientProps>) {
  // const isActive = firstSegment?.includes(path);
  return (
    <NavigationMenuItem className={className }>
      <Link className={ LINK_CLASSNAMES } href={ `/${path}` }>
        { children }
      </Link>
    </NavigationMenuItem>
  );
}
