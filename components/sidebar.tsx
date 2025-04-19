"use client"

import type React from "react"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

interface NavItem {
  title: string
  href: string
  icon?: React.ReactNode
  children?: NavItem[]
}

export default function Sidebar() {
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
      href: "",
      children: [
        {
          title: "Get Profile by Username",
          href: "/docs/endpoints/users/profile-by-username",
        },
        {
          title: "Get Profile by User ID",
          href: "/docs/endpoints/users/profile-by-userid",
        },
        {
          title: "Get User Tweets",
          href: "/docs/endpoints/users/tweets",
        },
        {
          title: "Get User Tweets by ID",
          href: "/docs/endpoints/users/tweets-by-userid",
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
      ],
    },
    {
      title: "Tweet Endpoints",
      href: "",
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
          title: "Advanced Search",
          href: "/docs/endpoints/search/advanced",
        },
      ],
    },
    {
      title: "Data Models",
      href: "/docs/data-models",
    },
  ]

  return (
    <aside className="w-64 border-r border-gray-800 bg-gray-950 hidden md:block overflow-y-auto">
      <div className="py-4">
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold text-white">Documentation</h2>
        </div>
        <nav className="mt-2">
          {navItems.map((item, index) => (
            <div key={index} className="px-2 py-1">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md",
                  pathname === item.href
                    ? "bg-emerald-500 text-black font-medium"
                    : "text-gray-300 hover:text-white hover:bg-gray-800",
                )}
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
                        pathname === child.href ? "text-emerald-500 font-medium" : "text-gray-400 hover:text-white",
                      )}
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
    </aside>
  )
}
