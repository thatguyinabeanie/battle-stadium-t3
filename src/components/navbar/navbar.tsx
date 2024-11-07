"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { NavbarItemsConfigs } from "~/lib/config/site";
import BattleStadium from "../battle-stadium";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import MobileMenu from "./mobile-menu";
import { RightMenu } from "./right-menu";

export default function Navbar(){
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100;

      if (currentScrollY < scrollThreshold) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        "sticky top-0 z-40 transform transition-transform duration-300 w-full ",
        !isVisible && "-translate-y-full",
      )}
    >
      <nav className="relative flex w-full border-b bg-background">
        <div className="container mx-auto px-4 w-full">
          <div className="flex w-full h-16 items-center justify-between">

            <BattleStadium />

            {/* Desktop Navigation */}
            <div className="hidden md:flex">
              { NavbarItemsConfigs.map(({label, key}) => (
                <Link
                  key={key}
                  href={`/${key}`}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === `/${key}`
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <MobileMenu />

            <RightMenu />
          </div>
        </div>
      </nav>
    </div>
  );
};

