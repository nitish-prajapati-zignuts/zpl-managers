"use client"

import * as React from "react"
import {
  AudioWaveform,
  Loader2,
  AlertCircle,
  User,
  Gavel,
  UserX,
  Clock,
  ChevronRight,
  ArrowRight,
  Search,
  LogOut
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTeamPlayers, useTeamPlayerById } from "@/app/services/query"
import { Button } from "./ui/button"
import { PlayerDialog } from "./player-dialog"
import { useAuthStore } from "@/lib/store"
import { useRouter } from "next/navigation"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isLoading, error } = useTeamPlayers()
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [open, setOpen] = React.useState(false)
  const [selectedPlayer, setSelectedPlayer] = React.useState<any>(null)
  const [searchQuery, setSearchQuery] = React.useState("")

  const players = data?.data || []

  const filteredPlayers = React.useMemo(() => {
    return players.filter((p: any) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [players, searchQuery])

  const pendingPlayers = filteredPlayers.filter(p => !p.status || p.status?.toLowerCase() !== "sold")
  const unsoldPlayers = filteredPlayers.filter(p => p.status?.toLowerCase() === "unsold")
  const soldPlayers = filteredPlayers.filter(p => p.status?.toLowerCase() === "sold")

  const handleOpenDialog = (player: any) => {
    setSelectedPlayer(player)
    setOpen(true)
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-sm font-medium">Loading Players...</span>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-destructive">
          <AlertCircle className="h-6 w-6" />
          <span className="text-center text-sm font-medium">{error.message}</span>
        </div>
      )
    }

    return (
      <>
        {/* --- PENDING PLAYERS SECTION --- */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center text-yellow-600 hover:bg-yellow-50/50 transition-colors rounded-md p-2">
                <Clock className="mr-2 h-4 w-4" />
                <span className="font-bold uppercase tracking-wider text-[11px]">Upcoming Queue</span>
                <SidebarMenuBadge className="ml-auto bg-yellow-100 text-yellow-700">{pendingPlayers.length}</SidebarMenuBadge>
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {pendingPlayers.map((player) => (
                    <SidebarMenuItem className="flex flex-row items-center pr-2" key={player._id} onClick={() => handleOpenDialog(player)}>
                      <SidebarMenuButton className="flex-1">
                        <User className="h-4 w-4 opacity-70" />
                        <span className="truncate">{player.name}</span>
                        <span className="ml-auto text-[10px] opacity-50 font-mono text-xs">₹{player.basePrice}</span>
                      </SidebarMenuButton>
                      <ArrowRight
                        className="h-4 w-4 opacity-40 hover:opacity-100 cursor-pointer transition-opacity"
                        onClick={() => handleOpenDialog(player)}
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* --- SOLD PLAYERS SECTION --- */}
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center text-blue-600 hover:bg-blue-50/50 transition-colors rounded-md p-2">
                <Gavel className="mr-2 h-4 w-4" />
                <span className="font-bold uppercase tracking-wider text-[11px]">Sold Players</span>
                <SidebarMenuBadge className="ml-auto bg-blue-100 text-blue-700">{soldPlayers.length}</SidebarMenuBadge>
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {soldPlayers.map((player) => (
                    <SidebarMenuItem key={player._id} onClick={() => handleOpenDialog(player)}>
                      <SidebarMenuButton onClick={() => handleOpenDialog(player)}>
                        <User className="h-4 w-4 text-blue-500" />
                        <div className="flex flex-col overflow-hidden text-left">
                          <span className="truncate font-medium leading-none">{player.name}</span>
                          <span className="text-[10px] text-blue-600 font-bold">{player.soldTo}</span>
                        </div>
                        <span className="ml-auto text-[10px] font-bold text-green-700">₹{player.finalAmount}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* --- UNSOLD PLAYERS SECTION --- */}
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center text-destructive hover:bg-red-50/50 transition-colors rounded-md p-2">
                <UserX className="mr-2 h-4 w-4" />
                <span className="font-bold uppercase tracking-wider text-[11px]">Unsold</span>
                <SidebarMenuBadge className="ml-auto bg-red-100 text-red-700">{unsoldPlayers.length}</SidebarMenuBadge>
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {unsoldPlayers.map((player) => (
                    <SidebarMenuItem key={player._id} onClick={() => handleOpenDialog(player)}>
                      <SidebarMenuButton className="opacity-60" onClick={() => handleOpenDialog(player)}>
                        <User className="h-4 w-4" />
                        <span className="truncate">{player.name}</span>
                        <span className="ml-auto text-[10px]">Base: ₹{player.basePrice}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </>
    )
  }

  return (
    <>
      <Sidebar {...props} className="border-r shadow-sm">
        <SidebarHeader className="border-b px-6 py-5 flex flex-row items-center gap-3 bg-white">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              alt="ZPL Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
          <span className="font-black tracking-tighter text-xl text-primary">ZPL AUCTION</span>
        </SidebarHeader>

        <SidebarContent className="p-2 space-y-1">
          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Find player..."
                className="w-full bg-slate-100 border-none rounded-md py-2 pl-8 pr-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          {renderContent()}
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                  {user?.teamName?.charAt(0) || "U"}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-[16px] text-muted-foreground uppercase">{user?.teamName || "No Team"}</span>
                </div>
              </div>
              <SidebarMenuButton
                onClick={() => {
                  logout()
                  router.push("/")
                }}
                className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors mt-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-semibold">Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <PlayerDialog
        open={open}
        onOpenChange={setOpen}
        player={selectedPlayer}
      />
    </>
  )
}