"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100; // Reduced from 200 to make it more noticeable

      // Show navbar at the top
      if (currentScrollY < scrollThreshold) {
        setIsVisible(true);
      }
      // When scrolling down, hide the navbar
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      // When scrolling up, show the navbar
      else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <div className={ cn(
      "sticky top-0 transform transition-transform duration-300",
      !isVisible && "-translate-y-full"
    ) }>
      <nav className="flex w-full z-50 border-b bg-background">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */ }
            <Link href="/" className="text-xl font-bold">
              Logo
            </Link>

            {/* Desktop Navigation */ }
            <div className="hidden space-x-4 md:flex">
              { navItems.map((item) => (
                <Link
                  key={ item.href }
                  href={ item.href }
                  className={ cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  ) }
                >
                  { item.name }
                </Link>
              )) }
            </div>

            {/* Mobile Menu Button */ }
            <div className="md:hidden">
              <Sheet open={ isMobileMenuOpen } onOpenChange={ setIsMobileMenuOpen }>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                  <div className="mt-6 flex flex-col space-y-4">
                    { navItems.map((item) => (
                      <Link
                        key={ item.href }
                        href={ item.href }
                        onClick={ () => setIsMobileMenuOpen(false) }
                        className={ cn(
                          "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          pathname === item.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        ) }
                      >
                        { item.name }
                      </Link>
                    )) }
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
