"use client"

import { AppSidebar } from "../../components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"

import Link from "next/link"
import { useAuthStore } from "@/lib/store"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)

  // 1. Add a hydration state
  const [isHydrated, setIsHydrated] = useState(false)

  // 2. Wait for the client-side to mount/hydrate
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // 3. Only perform the check AFTER hydration
  if (isHydrated && (!token || !user)) {
    redirect("/")
  }

  // 4. Show a loading state (optional) to prevent flickering
  if (!isHydrated) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b bg-white">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-col gap-0.5">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Welcome, <span className="text-primary">{user?.teamName}</span>
              </h2>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="opacity-70 text-[10px] uppercase tracking-wider">Captain</span>
                  <span className="text-foreground/80">{user?.captainName}</span>
                </span>
                <span className="h-3 w-[1px] bg-border" /> {/* Vertical Divider */}
                <span className="flex items-center gap-1">
                  <span className="opacity-70 text-[10px] uppercase tracking-wider">Manager</span>
                  <span className="text-foreground/80">{user?.managerName}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/view-my-team">
              <Button variant="outline" size="sm" className="font-bold uppercase tracking-tight text-[11px] h-8 border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                View My Team
              </Button>
            </Link>
            <Link href="/view-all-teams">
              <Button variant="outline" size="sm" className="font-bold uppercase tracking-tight text-[11px] h-8 border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                View All Teams
              </Button>
            </Link>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
