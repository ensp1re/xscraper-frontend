"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface NavItem {
  title: string
  href: string
  icon?: React.ReactNode
  children?: NavItem[]
}

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Introduction",
      href: "/docs/introduction",
    },
    {
      title: "Authentication",
      href: "/docs/authentication",
    },
    {
      title: "User Endpoints",
      href: "/docs/endpoints/users",
      children: [
        {
          title: "Get User Info",
          href: "/docs/endpoints/users/info",
        },
        {
          title: "Get User Tweets",
          href: "/docs/endpoints/users/tweets",
        },
        {
          title: "Get User Replies",
          href: "/docs/endpoints/users/replies",
        },
        {
          title: "Get Latest Tweet",
          href: "/docs/endpoints/users/latest-tweet",
        },
        {
          title: "Get User Followers",
          href: "/docs/endpoints/users/followers",
        },
        {
          title: "Get User Following",
          href: "/docs/endpoints/users/following",
        },
        {
          title: "Get User ID",
          href: "/docs/endpoints/users/user-id",
        },
        {
          title: "Get User Likes",
          href: "/docs/endpoints/users/likes",
        },
      ],
    },
    {
      title: "Tweet Endpoints",
      href: "/docs/endpoints/tweets",
      children: [
        {
          title: "Get Tweet by ID",
          href: "/docs/endpoints/tweets/by-id",
        },
        {
          title: "Get Tweet Replies",
          href: "/docs/endpoints/tweets/replies",
        },
        {
          title: "Get Tweet Quotes",
          href: "/docs/endpoints/tweets/quotes",
        },
      ],
    },
    {
      title: "Search Endpoints",
      href: "/docs/endpoints/search",
      children: [
        {
          title: "Search Tweets",
          href: "/docs/endpoints/search/basic",
        },
        {
          title: "Search Profiles",
          href: "/docs/endpoints/search/profiles",
        },
        {
          title: "Advanced Search",
          href: "/docs/endpoints/search/advanced",
        },
      ],
    },
    {
      title: "List Endpoints",
      href: "/docs/endpoints/lists",
      children: [
        {
          title: "Get List Tweets",
          href: "/docs/endpoints/lists/tweets",
        },
      ],
    },
    {
      title: "Other Endpoints",
      href: "/docs/endpoints/trends",
      children: [
        {
          title: "Get Trends",
          href: "/docs/endpoints/trends",
        },
        {
          title: "Health Check",
          href: "/docs/endpoints/health",
        },
        {
          title: "Pool Statistics",
          href: "/docs/endpoints/stats",
        },
      ],
    },
    {
      title: "Data Models",
      href: "/docs/data-models",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-emerald-500 flex items-center justify-center">
            <span className="font-bold text-black">X</span>
          </div>
          <Link href="/" className="text-xl font-bold text-white">
            XScraper
          </Link>
        </div>

        {/* Desktop search */}
        <div className="hidden md:flex items-center w-full max-w-sm relative mx-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="pl-8 bg-gray-900 border-gray-800 focus-visible:ring-emerald-500"
          />
        </div>

        {/* Mobile search toggle */}
        <div
          className={`flex md:hidden items-center transition-all duration-200 ${isSearchOpen ? "w-full" : "w-0 overflow-hidden"
            }`}
        >
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-gray-900 border-gray-800 focus-visible:ring-emerald-500 w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile search button */}
          {!isSearchOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          {/* Close search button (mobile) */}
          {isSearchOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close search</span>
            </Button>
          )}

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
              <Link href="/docs/introduction">Docs</Link>
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-black">
                    <Link href="/docs/get-started">Start Now</Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900 border-gray-800 text-white">
                  <p>Dashboard in development</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>

          {/* Mobile menu button */}
          {!isSearchOpen && (
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9 text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs p-0 bg-gray-950 border-gray-800">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-emerald-500 flex items-center justify-center">
                        <span className="font-bold text-black">X</span>
                      </div>
                      <span className="text-xl font-bold text-white">XScraper</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMenuOpen(false)}
                      className="h-8 w-8 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1 px-2">
                      {navItems.map((item, index) => (
                        <div key={index} className="py-1">
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center px-3 py-2 text-sm rounded-md",
                              pathname === item.href
                                ? "bg-emerald-500 text-black font-medium"
                                : "text-gray-300 hover:text-white hover:bg-gray-800",
                            )}
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.title}
                          </Link>
                          {item.children && (
                            <div className="ml-4 mt-1 space-y-1">
                              {item.children.map((child, childIndex) => (
                                <Link
                                  key={childIndex}
                                  href={child.href}
                                  className={cn(
                                    "flex items-center px-3 py-1.5 text-sm rounded-md",
                                    pathname === child.href
                                      ? "text-emerald-500 font-medium"
                                      : "text-gray-400 hover:text-white",
                                  )}
                                  onClick={() => setMenuOpen(false)}
                                >
                                  {child.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>
                  <div className="p-4 border-t border-gray-800">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black">Start Now</Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-900 border-gray-800 text-white">
                          <p>Dashboard in development</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}
