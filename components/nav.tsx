"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@synq/ui/component";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@synq/ui/component";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-5xl mx-auto px-6 py-4">
        {/* Left: Logo + Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/brand/synq-icon.png"
              alt="Synq Logo"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
            <span className="font-medium text-foreground">Synq</span>
          </Link>

          {/* Desktop Navigation Menu */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#features">Features</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#pricing">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#faq">FAQ</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/blog">Blog</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: CTA + Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button asChild size="sm">
            <a href="#get-started">Get started</a>
          </Button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] bg-background/95 backdrop-blur-md z-40">
          <div className="bg-muted backdrop-blur-md flex flex-col items-start px-6 py-6 gap-4">
            <Link
              href="#features"
              onClick={closeMenu}
              className="text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              onClick={closeMenu}
              className="text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              onClick={closeMenu}
              className="text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/blog"
              onClick={closeMenu}
              className="text-base text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Button asChild size="sm" className="mt-2">
              <a href="#get-started" onClick={closeMenu}>
                Get started
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
