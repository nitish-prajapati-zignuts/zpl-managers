"use client"

import { AppSidebar } from "../../components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useAuthStore, useTeamStore } from "@/lib/store"
import { redirect } from "next/navigation"
import { useEffect, useState, useMemo } from "react"
import { useGetSingleTeam } from "@/app/services/query"
import { formatAmount, getRoleLabel } from "@/lib/utils"
import { TEAM_CONFIG } from "@/lib/config"
import { Users, Crown, Banknote } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)

  const [isHydrated, setIsHydrated] = useState(false)
  const [isMyTeamOpen, setIsMyTeamOpen] = useState(false)

  const { data: teamData, isLoading: isTeamLoading } = useGetSingleTeam(user?.teamRef || "")
  const setTeamData = useTeamStore((state) => state.setTeamData)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (teamData) {
      setTeamData(teamData)
    }
  }, [teamData, setTeamData])

  if (isHydrated && (!token || !user)) {
    redirect("/")
  }

  // Pre-sort players by price descending
  const sortedPlayers = useMemo(() => {
    if (!teamData?.data?.players) return []
    return [...teamData.data.players].sort((a, b) => {
      const priceA = a.finalAmount ?? a.basePrice ?? 0
      const priceB = b.finalAmount ?? b.basePrice ?? 0
      return priceB - priceA
    })
  }, [teamData])

  const teamConfig = user?.teamName ? TEAM_CONFIG[user.teamName.toUpperCase()] : null
  const teamColor = teamConfig?.color || "#3b82f6"

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
                Welcome, <span style={{ color: teamColor }}>{user?.teamName}</span>
              </h2>
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="opacity-70 text-[10px] uppercase tracking-wider">Captain</span>
                  <span className="text-foreground/80">{user?.captainName}</span>
                </span>
                <span className="h-3 w-[1px] bg-border" />
                <span className="flex items-center gap-1">
                  <span className="opacity-70 text-[10px] uppercase tracking-wider">Manager</span>
                  <span className="text-foreground/80">{user?.managerName}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsMyTeamOpen(true)}
              variant="outline"
              size="sm"
              className="font-bold uppercase tracking-tight text-[11px] h-8 border-2 border-primary text-primary hover:bg-primary/5 transition-all active:scale-95"
            >
              View My Team
            </Button>

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

      <Dialog open={isMyTeamOpen} onOpenChange={setIsMyTeamOpen}>
        <DialogContent className="sm:max-w-2xl border-none shadow-2xl overflow-hidden rounded-[2rem] p-0 gap-0">
          <div className="p-8 text-white relative flex flex-col items-center" style={{ backgroundColor: teamColor }}>
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Users size={140} />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30 shadow-xl overflow-hidden">
                {teamConfig?.logo ? (
                  <Image src={teamConfig.logo} alt="Logo" width={60} height={60} className="object-contain p-2" />
                ) : (
                  <Users size={40} />
                )}
              </div>
              <DialogTitle className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-2">
                {user?.teamName}
              </DialogTitle>
              <div className="flex gap-4">
                <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                  <Crown size={12} className="text-yellow-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{user?.captainName}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 italic">Squad Roster • Sorted by Value</h3>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md uppercase tracking-wide">
                {sortedPlayers.length} Players Bound
              </span>
            </div>

            <div className="max-h-[50vh] overflow-y-auto pr-1 space-y-2 custom-scrollbar-thin">
              {isTeamLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-20 bg-slate-200 animate-pulse rounded-2xl" />
                ))
              ) : sortedPlayers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-300">
                  <Users size={48} className="mb-4 opacity-50" />
                  <p className="text-sm font-bold uppercase tracking-widest italic">No players recruited yet</p>
                </div>
              ) : (
                sortedPlayers.map((player: any) => (
                  <div
                    key={player._id}
                    className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between hover:border-slate-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-xs uppercase group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {player.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 uppercase italic leading-none mb-1 text-sm tracking-tight">{player.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {getRoleLabel(player.role)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <div className="flex items-center gap-1 text-slate-900 font-black italic tracking-tighter text-lg">
                        <Banknote size={16} className="text-slate-400" />
                        {formatAmount(player.finalAmount || player.basePrice)}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Recruitment Value</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Button
              onClick={() => setIsMyTeamOpen(false)}
              className="w-full mt-6 py-6 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl active:scale-95 transition-all text-xs italic"
            >
              Return to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
