
// "use client"

// import * as React from "react"
// import Image from "next/image"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Users, UserCircle, DollarSign, Clock, Award } from "lucide-react"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog"
// import { useTeamPlayerById, useTeams } from "@/app/services/query"

// // Custom SVG Icons for Cricket Roles
// const BatIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-amber-500">
//         <path d="M18.5 3.5a2.121 2.121 0 0 1 3 3L8.5 19.5a2.121 2.121 0 0 1-3-3L18.5 3.5z" />
//         <path d="m7.5 15.5-3 3" />
//     </svg>
// )

// const BallIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-blue-500">
//         <circle cx="12" cy="12" r="9" />
//         <path d="M12 3a9 9 0 0 0 0 18" />
//         <path d="M12 8a4 4 0 0 1 0 8" />
//     </svg>
// )

// const FieldIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-green-500">
//         <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
//         <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
//         <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
//         <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
//     </svg>
// )

// const KeepIcon = () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-purple-500">
//         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
//         <path d="M8 10h8" />
//         <path d="M8 14h8" />
//     </svg>
// )

// // Map player role string from API to display icon
// const getRoleIcon = (role: string) => {
//     switch (role?.toLowerCase()) {
//         case "batsmen":
//         case "batsman":
//             return <BatIcon />
//         case "bowler":
//         case "bowling":
//             return <BallIcon />
//         case "fielder":
//         case "fielding":
//             return <FieldIcon />
//         case "wicketkeeper":
//         case "wk":
//         case "keeper":
//             return <KeepIcon />
//         default:
//             return <UserCircle className="h-3 w-3 text-slate-400" />
//     }
// }

// // Format rupees: if >= 10,00,000 show in Cr, else in L
// const formatAmount = (amount: number): string => {
//     if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`
//     if (amount >= 100000) return `${(amount / 100000).toFixed(1)} L`
//     return `${(amount / 1000).toFixed(0)}K`
// }

// // Check if a color is light or dark for text contrast
// const isLightColor = (color: string) => {
//     const hex = color.replace('#', '');
//     if (hex.length !== 6) return false;
//     const r = parseInt(hex.substr(0, 2), 16);
//     const g = parseInt(hex.substr(2, 2), 16);
//     const b = parseInt(hex.substr(4, 2), 16);
//     const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//     return brightness > 155;
// };

// const TEAM_CONFIG: any = {
//     "THE MAVERICKS": { color: "#372267", logo: "/assets/teams/theMavericks.png", bg: "#3722671A", badgeColor: "#372267" },
//     "THE MAVERICS": { color: "#372267", logo: "/assets/teams/theMavericks.png", bg: "#3722671A", badgeColor: "#372267" },
//     "MARVEL MONSTER": { color: "#0F245C", logo: "/assets/teams/marvelMonster.png", bg: "#0F245C1A", badgeColor: "#0F245C" },
//     "MARVEL MONSTERS": { color: "#0F245C", logo: "/assets/teams/marvelMonster.png", bg: "#0F245C1A", badgeColor: "#0F245C" },
//     "GRAY MIGHTY": { color: "#9899AE", logo: "/assets/teams/grayMighty.png", bg: "#9899AE1A", badgeColor: "#9899AE" },
//     "TROJAN HORSE": { color: "#D9ADE3", logo: "/assets/teams/trojanHorsh.png", bg: "#D9ADE31A", badgeColor: "#D9ADE3" },
//     "STAR STRIKERS": { color: "#C63674", logo: "/assets/teams/starStriker.png", bg: "#C636741A", badgeColor: "#C63674" },
//     "RED SQUAD": { color: "#640105", logo: "/assets/teams/redSquad.png", bg: "#6401051A", badgeColor: "#640105" },
//     "THE TECH TITANS": { color: "#000000", logo: "/assets/teams/techTitans.png", bg: "#0000001A", badgeColor: "#000000" },
//     "SUPER SMASHERS": { color: "#FFD451", logo: "/assets/teams/superSmash.png", bg: "#FFD4511A", badgeColor: "#000000" },
// };

// // Find playerStats for a given player _id within a team
// const findStatsForPlayer = (playerStats: any[], playerId: string) => {
//     return playerStats?.find((s: any) => s.playerRef === playerId) ?? null
// }

// export default function ViewAllTeams() {
//     const [selectedPlayer, setSelectedPlayer] = React.useState<any>(null)
//     const [selectedStats, setSelectedStats] = React.useState<any>(null)
//     const [open, setOpen] = React.useState(false)

//     const { data: teamsResponse, isLoading: isTeamsLoading } = useTeams()

//     // teamsResponse is expected to be the API JSON: { success, count, data: [...] }
//     const teams: any[] = teamsResponse?.data ?? []

//     const handlePlayerClick = (player: any, stats: any) => {
//         setSelectedPlayer(player)
//         setSelectedStats(stats)
//         setOpen(true)
//     }

//     return (
//         <div className="p-4 bg-slate-50 min-h-screen">
//             {isTeamsLoading ? (
//                 <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//                     {Array.from({ length: 8 }).map((_, i) => (
//                         <div key={i} className="h-96 rounded-2xl bg-slate-200 animate-pulse" />
//                     ))}
//                 </div>
//             ) : (
//                 <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//                     {teams.map((team: any) => {
//                         const teamNameKey = team.name?.toUpperCase().trim() || ""
//                         const teamConfig = TEAM_CONFIG[teamNameKey] || { color: "#64748b", logo: null, bg: "#f1f5f9" }
//                         const spent = (team.totalBudget ?? 0) - (team.budgetRemaining ?? 0)
//                         const remaining = team.budgetRemaining ?? 0
//                         const players: any[] = team.players ?? []
//                         const playerStats: any[] = team.playerStats ?? []
//                         const teamColor = teamConfig.color;
//                         const isLight = isLightColor(teamColor);
//                         const textColor = isLight ? "#000000" : "#ffffff";

//                         return (
//                             <section
//                                 key={team._id}
//                                 className="flex flex-col rounded-xl shadow-2xl overflow-hidden transition-all duration-300 group min-h-[550px]"
//                                 style={{ border: `1.5px solid ${teamColor}55` }}
//                             >
//                                 {/* ── Card Header with team colour ─── */}
//                                 <div
//                                     className="relative p-4 flex items-start justify-between"
//                                     style={{ backgroundColor: teamColor }}
//                                 >
//                                     {/* Team info */}
//                                     <div className="flex-1 min-w-0 pr-2">
//                                         <h2
//                                             className="text-lg font-black tracking-widest uppercase leading-tight truncate"
//                                             style={{ color: textColor }}
//                                         >
//                                             {team.name}
//                                         </h2>
//                                         <p
//                                             className="text-[12px] font-bold uppercase tracking-widest truncate italic mt-1"
//                                             style={{ color: isLight ? "#0d0d14cc" : "#ffffffaa" }}
//                                         >
//                                             Captain: {team.captainName}
//                                         </p>
//                                         <p
//                                             className="text-[12px] font-medium uppercase tracking-widest truncate mt-0.5"
//                                             style={{ color: isLight ? "#0d0d1499" : "#ffffff66" }}
//                                         >
//                                             Manager: {team.managerName}
//                                         </p>
//                                     </div>

//                                     {/* Team logo — top right */}
//                                     <div
//                                         className="shrink-0 rounded-xl flex items-center justify-center overflow-hidden"
//                                         style={{ backgroundColor: isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)" }}
//                                     >
//                                         {teamConfig.logo ? (
//                                             <Image
//                                                 src={teamConfig.logo}
//                                                 alt={team.name}
//                                                 width={60}
//                                                 height={60}
//                                                 className="w-full h-full object-contain p-1"
//                                             />
//                                         ) : (
//                                             <Users size={20} className={isLight ? "text-black/40" : "text-white/40"} />
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* ── Budget strip ──────────────────── */}
//                                 <div className="flex border-b">
//                                     <div className="flex-1 p-2 text-center border-r border-[#2a2a3d]">
//                                         <p className="text-[14px] text-[#4a4a66] uppercase font-black tracking-tighter">Spent</p>
//                                         <p className="text-sm font-bold">{formatAmount(spent)}</p>
//                                     </div>
//                                     <div className="flex-1 p-2 text-center">
//                                         <p className="text-[14px] text-[#4a4a66] uppercase font-black tracking-tighter">Remaining</p>
//                                         <p className="text-sm font-bold" style={{ color: teamColor === "#000000" ? "#f0c040" : teamColor }}>
//                                             {formatAmount(remaining)}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* ── Player roster ─────────────────── */}
//                                 <div className="flex-1 overflow-y-auto custom-scrollbar-thin p-2 space-y-1">
//                                     {players.length === 0 ? (
//                                         <div className="flex flex-col items-center justify-center h-full py-8 text-[#3a3a58]">
//                                             <Users className="mb-2 opacity-30" size={32} />
//                                             <span className="text-xs font-bold uppercase tracking-widest">No players yet</span>
//                                         </div>
//                                     ) : (
//                                         players.map((player: any, idx: number) => {
//                                             const stats = findStatsForPlayer(playerStats, player._id);
//                                             return (
//                                                 <div
//                                                     key={player._id}
//                                                     onClick={() => handlePlayerClick(player, stats)}
//                                                     className="flex justify-between items-center px-3 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-all cursor-pointer hover:bg-white/5"
//                                                     style={{ backgroundColor: `${teamColor}12` }}
//                                                 >
//                                                     <div className="flex items-center gap-2 overflow-hidden">
//                                                         <span className="text-[9px] text-[#4a4a66] w-4 font-bold shrink-0">{idx + 1}.</span>
//                                                         <span className="text-xs text-gray-800 font-medium truncate uppercase tracking-tight">
//                                                             {player.name}
//                                                         </span>
//                                                     </div>
//                                                     <div className="flex items-center gap-2">
//                                                         <div className="opacity-20">{getRoleIcon(player.role)}</div>
//                                                         <span
//                                                             className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0"
//                                                             style={{
//                                                                 color: teamColor === "#000000" ? "#f0c040" : teamColor,
//                                                                 backgroundColor: `${teamColor === "#000000" ? "#f0c040" : teamColor}18`,
//                                                             }}
//                                                         >
//                                                             {player.finalAmount ? formatAmount(player.finalAmount) : `₹${player.basePrice} L`}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })
//                                     )}
//                                 </div>

//                                 {/* ── Card footer ───────────────────── */}
//                                 <div
//                                     className="p-2 border-t flex justify-center items-center"
//                                     style={{ borderColor: `${teamColor}44`, backgroundColor: `${teamColor}18` }}
//                                 >
//                                     <div className="flex gap-1.5">
//                                         <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${teamColor}99` }} />
//                                         <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${teamColor}55` }} />
//                                         <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${teamColor}99` }} />
//                                     </div>
//                                 </div>
//                             </section>
//                         )
//                     })}
//                 </div>
//             )}

//             <Dialog open={open} onOpenChange={setOpen}>
//                 <DialogContent className="sm:max-w-md border-none shadow-2xl overflow-hidden rounded-3xl p-0">
//                     <div className="bg-slate-900 p-8 text-white relative">
//                         <div className="absolute top-0 right-0 p-8 opacity-10">
//                             <Users size={120} />
//                         </div>
//                         <DialogHeader className="relative z-10">
//                             <div className="flex items-center gap-2 mb-2">
//                                 <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic">
//                                     Player Profile
//                                 </span>
//                                 <div className="p-1 rounded bg-white/10 backdrop-blur-sm">
//                                     {getRoleIcon(selectedPlayer?.role)}
//                                 </div>
//                                 {selectedPlayer?.grade && (
//                                     <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">
//                                         Grade {selectedPlayer.grade}
//                                     </span>
//                                 )}
//                             </div>
//                             <DialogTitle className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-1">
//                                 {selectedPlayer?.name}
//                             </DialogTitle>
//                             <DialogDescription className="text-slate-400 font-bold uppercase text-[11px] tracking-widest italic">
//                                 Season {selectedStats?.season ?? "2025"} • {selectedPlayer?.soldTo ?? "Official Squad Member"}
//                             </DialogDescription>
//                         </DialogHeader>
//                     </div>

//                     <div className="p-8 bg-white grid gap-6">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner">
//                                 <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 font-mono">Sold Price</span>
//                                 <p className="text-3xl font-black text-slate-900 italic tracking-tighter leading-none">
//                                     ₹{selectedPlayer?.finalAmount ? formatAmount(selectedPlayer.finalAmount) : "—"}
//                                 </p>
//                             </div>
//                             <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner flex flex-col justify-center items-center">
//                                 <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 font-mono">Status</span>
//                                 <div className="flex items-center gap-1.5">
//                                     <div className={`h-2 w-2 rounded-full ${selectedPlayer?.status === "sold" ? "bg-green-500 animate-pulse" : "bg-yellow-400"}`} />
//                                     <p className={`text-xl font-black uppercase italic tracking-tight ${selectedPlayer?.status === "sold" ? "text-green-600" : "text-yellow-600"}`}>
//                                         {selectedPlayer?.status ?? "—"}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Player Statistics from playerStats */}
//                         <div className="space-y-3">
//                             <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest font-mono">Season Stats</span>
//                             <div className="grid grid-cols-3 gap-3">
//                                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
//                                     <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Matches</span>
//                                     <p className="text-xl font-black text-slate-900">{selectedStats?.total_match ?? 0}</p>
//                                 </div>
//                                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
//                                     <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Runs</span>
//                                     <p className="text-xl font-black text-slate-900">{selectedStats?.batting?.total_runs ?? 0}</p>
//                                 </div>
//                                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
//                                     <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Wickets</span>
//                                     <p className="text-xl font-black text-slate-900">{selectedStats?.bowling?.total_wickets ?? 0}</p>
//                                 </div>
//                                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
//                                     <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">SR</span>
//                                     <p className="text-xl font-black text-slate-900">{selectedStats?.batting?.strike_rate ?? 0}</p>
//                                 </div>
//                                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
//                                     <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Economy</span>
//                                     <p className="text-xl font-black text-slate-900">{selectedStats?.bowling?.economy ?? 0}</p>
//                                 </div>
//                                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
//                                     <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">Catches</span>
//                                     <p className="text-xl font-black text-slate-900">{selectedStats?.fielding?.total_catches ?? 0}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all cursor-default group">
//                                 <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
//                                     <Award className="h-6 w-6 text-slate-500 group-hover:text-primary transition-colors" />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-black text-slate-900 uppercase italic leading-none mb-1">Performance Tier</p>
//                                     <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
//                                         {selectedStats?.is_mvp ? "MVP • Top Tier" : `Grade ${selectedPlayer?.grade ?? "—"} Standard`}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all cursor-default group">
//                                 <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
//                                     <Clock className="h-6 w-6 text-slate-500 group-hover:text-primary transition-colors" />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm font-black text-slate-900 uppercase italic leading-none mb-1">Availability</p>
//                                     <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
//                                         {selectedPlayer?.isRetained ? "Retained Player" : "Auction Acquisition"}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         <button
//                             onClick={() => setOpen(false)}
//                             className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 italic"
//                         >
//                             Close Profile
//                         </button>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }

"use client"

import { Team } from "../types/types"
import { PlayerDialog } from "./_components/PlayerDialog"
import { SkeletonGrid } from "./_components/SkeletonGrid"
import { TeamCard } from "./_components/TeamCard"
import { useViewAllTeams } from "./_hooks/useViewAllTeams"



export default function ViewAllTeams() {
    const {
        teams,
        isLoading,
        selectedPlayer,
        selectedStats,
        dialogOpen,
        setDialogOpen,
        handlePlayerClick,
    } = useViewAllTeams()

    return (
        <div className="p-4 bg-slate-50 min-h-screen">
            {isLoading ? (
                <SkeletonGrid />
            ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {teams.map((team:Team) => (
                        <TeamCard
                            key={team._id}
                            team={team}
                            onPlayerClick={handlePlayerClick}
                        />
                    ))}
                </div>
            )}

            <PlayerDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                player={selectedPlayer}
                stats={selectedStats}
            />
        </div>
    )
}