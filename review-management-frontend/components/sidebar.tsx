"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, MessageSquare, BarChart2, Settings, QrCode } from "lucide-react"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Reviews",
    href: "/reviews",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart2,
  },
  {
    title: "NFC QR Management",
    href: "/nfc-qr-management",
    icon: QrCode,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <span className="text-lg font-bold">Review Management</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 overflow-auto">
          <div className="flex flex-col gap-2 p-4">
            {sidebarNavItems.map((item, index) => (
              <Button
                key={index}
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}