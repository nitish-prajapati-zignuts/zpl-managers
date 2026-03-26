"use client"

import * as React from "react"
import { Wallet, CircleDollarSign, Users, Trophy, ChevronRight, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { getLogs } from "../api/action"
import { useLogs } from "../services/query"

export default function DashboardPage() {
    // Static Data for demonstration
    const stats = {
        totalBudget: 100000000, // 10 Cr
        remainingBudget: 45500000, // 4.55 Cr
        totalPlayers: 14,
        maxSquadSize: 25,
    }

    const { data: logs = [], isLoading } = useLogs()

    const logsArray = Array.isArray(logs) ? logs : ((logs as any)?.data || []);
    const sorted = [...logsArray].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const lastPutOnBlock = sorted[0];

    console.log(lastPutOnBlock)

        return (
            <div className="flex flex-col gap-6 p-6 md:p-4">

                {/* --- SECTION 1: TOP BUDGET CARDS --- */}
                <div className="grid gap-3 grid-cols-2 md:grid-cols-3 shrink-0">
                    <Card className="shadow-sm border-l-4 border-l-blue-600">
                        <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-4">
                            <CardTitle className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                Total Budget
                            </CardTitle>
                            <Wallet className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="text-xl md:text-2xl font-bold tracking-tight">₹{stats.totalBudget.toLocaleString()}</div>
                            <p className="text-[10px] text-muted-foreground mt-0.5 font-medium italic">Initial Purse Allocation</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-l-4 border-l-green-600">
                        <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-4">
                            <CardTitle className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                Remaining
                            </CardTitle>
                            <CircleDollarSign className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="text-xl md:text-2xl font-bold text-green-700 tracking-tight">₹{stats.remainingBudget.toLocaleString()}</div>
                            <p className="text-[10px] text-green-600/80 mt-0.5 font-bold">45.5% remaining</p>
                        </CardContent>
                    </Card>

                    {/* Squad Progress — hidden on small screens in col-span, shown as third card on md+ */}
                    <Card className="hidden md:flex bg-primary/5 border-dashed border-primary/20 flex-col justify-between">
                        <CardHeader className="pb-0 pt-4 px-4">
                            <CardTitle className="text-[10px] font-bold uppercase flex items-center gap-1.5 text-primary tracking-widest">
                                <Users className="h-3.5 w-3.5" /> Squad Total
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-4">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black italic text-primary">{stats.totalPlayers}</span>
                                <span className="text-lg font-bold text-muted-foreground">/ {stats.maxSquadSize}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mt-3 overflow-hidden shadow-inner">
                                <div
                                    className="bg-primary h-full transition-all duration-700 ease-in-out"
                                    style={{ width: `${(stats.totalPlayers / stats.maxSquadSize) * 100}%` }}
                                />
                            </div>
                        </CardContent>
                        <div className="px-4 pb-4">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                                <span className="text-muted-foreground">Available Spots</span>
                                <span className="text-primary bg-primary/10 px-2 py-0.5 rounded">{stats.maxSquadSize - stats.totalPlayers} Left</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* --- SECTION 2: PLAYER IDENTITY CARD (fills remaining height, no scroll) --- */}
                {/* CHANGED: flex-1 min-h-0 ensures this section fills remaining space and clips overflow */}
                <div className="flex-1 min-h-0 transition-all duration-700 animate-in fade-in slide-in-from-bottom-4">

                    {/* Loading State */}
                    {isLoading && (
                        <Card className="h-full flex items-center justify-center animate-pulse border-l-4 border-l-muted">
                            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                                <Users className="h-10 w-10 opacity-20" />
                                <p className="text-xs font-black uppercase tracking-widest opacity-50">Syncing Auction Data...</p>
                            </div>
                        </Card>
                    )}

                    {!isLoading && (!lastPutOnBlock || !lastPutOnBlock.playerDetails) && (
                        <Card className="h-full flex items-center justify-center border-l-4 border-l-slate-200 bg-slate-50/50 transition-all duration-700 animate-in zoom-in-95">
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="relative">
                                    <div className="h-20 w-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                                        <Users className="h-10 w-10 text-slate-300 animate-pulse" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-blue-600 border-4 border-white flex items-center justify-center shadow-lg">
                                        <div className="h-2 w-2 rounded-full bg-white animate-ping" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-400 uppercase italic tracking-tighter leading-none">
                                        Waiting for player
                                    </h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                                        The next auction segment will begin soon
                                    </p>
                                </div>
                            </div>
                        </Card>
                    )}

                    {!isLoading && lastPutOnBlock?.playerDetails && (
                        // CHANGED: h-full + overflow-hidden keeps card locked in viewport
                        <Card className={`h-full flex flex-col overflow-hidden shadow-sm border-l-4 bg-card transition-all duration-500 ${lastPutOnBlock?.playerDetails?.status === "sold" ? "border-l-green-600 ring-1 ring-green-600/20" :
                            lastPutOnBlock?.playerDetails?.status === "unsold" ? "border-l-red-600 ring-1 ring-red-600/20" :
                                lastPutOnBlock?.playerDetails?.status === "on_block" ? "border-l-blue-600 shadow-blue-100/50 shadow-lg" :
                                    "border-l-blue-600"
                            }`}>

                            {/* Header: Player Identity — shrink-0 so it never compresses */}
                            <CardHeader className="pb-0 pt-4 px-4 md:px-6 flex flex-row items-center gap-3 md:gap-6 shrink-0">
                                {/* Avatar */}
                                <div className={`h-16 w-16 md:h-24 md:w-24 rounded-xl md:rounded-2xl flex items-center justify-center border-2 shrink-0 overflow-hidden shadow-sm transition-colors duration-500 ${lastPutOnBlock?.playerDetails?.status === "sold" ? "border-green-100 bg-green-50" :
                                    lastPutOnBlock?.playerDetails?.status === "unsold" ? "border-red-100 bg-red-50" :
                                        "border-blue-100 bg-blue-50"
                                    }`}>
                                    {lastPutOnBlock?.playerDetails?.photoUrl ? (
                                        <img
                                            src={lastPutOnBlock?.playerDetails?.photoUrl}
                                            alt={lastPutOnBlock?.playerDetails?.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <User className={`h-8 w-8 md:h-12 md:w-12 transition-colors duration-500 ${lastPutOnBlock?.playerDetails?.status === "sold" ? "text-green-300" :
                                            lastPutOnBlock?.playerDetails?.status === "unsold" ? "text-red-300" :
                                                "text-blue-300"
                                            }`} />
                                    )}
                                </div>

                                {/* Name & Info */}
                                <div className="flex flex-col gap-0.5 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`px-2 py-0.5 rounded-full text-white text-[9px] font-black uppercase tracking-tighter transition-colors duration-500 ${lastPutOnBlock?.playerDetails?.status === "sold" ? "bg-green-600 animate-bounce" :
                                            lastPutOnBlock?.playerDetails?.status === "unsold" ? "bg-red-600" :
                                                "bg-blue-600"
                                            }`}>
                                            {lastPutOnBlock?.playerDetails?.status?.replace("_", " ") || lastPutOnBlock?.action || "Active Bid"}
                                        </span>
                                        <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                            Current Player
                                        </CardTitle>
                                    </div>
                                    {/* CHANGED: text sizes are responsive */}
                                    <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic text-slate-900 truncate leading-tight">
                                        {lastPutOnBlock?.playerDetails?.name}
                                    </h2>
                                    <div className="flex items-baseline gap-1.5 mt-0.5">
                                        <span className="text-xl md:text-2xl font-black text-blue-700 tracking-tighter">
                                            ₹{lastPutOnBlock?.basePrice?.toLocaleString()}
                                        </span>
                                        <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Base Price</span>
                                    </div>
                                    <div className="flex gap-1.5 mt-0.5 flex-wrap">
                                        {lastPutOnBlock?.playerDetails?.role && (
                                            <span className="px-2 py-0.5 rounded-md bg-white/50 text-slate-700 text-[9px] font-black uppercase border border-slate-200">
                                                {lastPutOnBlock?.playerDetails?.role}
                                            </span>
                                        )}
                                        {lastPutOnBlock?.playerDetails?.grade && (
                                            <span className="px-2 py-0.5 rounded-md bg-white/50 text-orange-700 text-[9px] font-black uppercase border border-orange-200">
                                                Grade {lastPutOnBlock?.playerDetails?.grade}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>

                            {/* Content Area — flex-1 min-h-0 fills leftover space, overflow-auto for safety on very small screens */}
                            {lastPutOnBlock?.playerDetails?.status === "sold" ? (
                                <CardContent className="flex-1 min-h-0 mt-4 flex flex-col items-center justify-center bg-green-50/30 border-t border-green-100 py-6 animate-in zoom-in-95 duration-500 overflow-auto">
                                    <div className="relative">
                                        <Trophy className="h-20 w-20 md:h-28 md:w-28 text-yellow-500 animate-pulse" />
                                        <div className="absolute -top-3 -right-3 bg-green-600 text-white px-3 py-0.5 rounded-full text-[9px] font-black rotate-12 shadow-lg ring-2 ring-white">SOLD!</div>
                                    </div>
                                    <div className="text-center mt-6 space-y-1.5">
                                        <p className="text-xs font-bold text-green-700 uppercase tracking-widest">Acquired by</p>
                                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                                            {lastPutOnBlock?.teamName || lastPutOnBlock?.playerDetails?.soldTo || "Marvel Monsters"}
                                        </h3>
                                        <div className="pt-4">
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Final Bid Amount</p>
                                            <p className="text-3xl md:text-4xl font-black text-green-700 tracking-tighter">
                                                ₹{(lastPutOnBlock?.amount || lastPutOnBlock?.playerDetails?.finalAmount)?.toLocaleString() || "-"}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>

                            ) : lastPutOnBlock?.playerDetails?.status === "unsold" ? (
                                <CardContent className="flex-1 min-h-0 mt-4 flex flex-col items-center justify-center bg-red-50/30 border-t border-red-100 animate-in fade-in slide-in-from-top-4 duration-500 overflow-auto">
                                    <div className="flex flex-col items-center text-center gap-4">
                                        <div className="relative h-20 w-20 rounded-full bg-red-100 flex items-center justify-center border-4 border-white shadow-xl">
                                            <User className="h-10 w-10 text-red-600 opacity-50" />
                                            <div className="absolute h-20 w-20 border-4 border-red-600 rounded-full animate-ping opacity-20" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-5xl md:text-7xl font-black text-red-600 uppercase italic tracking-tighter leading-none">UNSOLD</h3>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Player returns to the auction pool</p>
                                        </div>
                                        <div className="px-5 py-2 bg-red-600 text-white rounded-md text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-200">
                                            Action Required: Reput on Block
                                        </div>
                                    </div>
                                </CardContent>

                            ) : (
                                /* ON-BLOCK: Stats Grid */
                                <>
                                    {/* CHANGED: flex-1 min-h-0 + overflow-auto only on this section so stats scroll within card if needed */}
                                    <CardContent className="flex-1 min-h-0 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 py-4 px-4 md:px-6 border-t bg-slate-50/30 animate-in fade-in duration-700 overflow-auto">
                                        {/* Batting Column */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 border-b border-blue-100 pb-1.5">
                                                <svg className="h-3.5 w-3.5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4-1 1-4 9.5-9.5z" />
                                                    <path d="M7 14l-5 5v3h3l5-5" />
                                                </svg>
                                                <p className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">Batting Stats</p>
                                            </div>
                                            <div className="grid grid-cols-3 gap-x-3 gap-y-2">
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Innings</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.batting?.innings ?? "-"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Runs</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.batting?.total_runs ?? "-"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">SR</p><p className="text-sm font-black text-blue-600">{lastPutOnBlock?.statsDetails?.batting?.strike_rate ?? "-"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Avg</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.batting?.average ?? "-"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Highest</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.batting?.highest_run ?? "-"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">4s/6s</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.batting?.["4s"] ?? "0"}/{lastPutOnBlock?.statsDetails?.batting?.["6s"] ?? "0"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">50s/100s</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.batting?.["50s"] ?? "0"}/{lastPutOnBlock?.statsDetails?.batting?.["100s"] ?? "0"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Not Out</p><p className="text-sm font-black text-green-600">{lastPutOnBlock?.statsDetails?.batting?.not_out ?? "0"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">B.Runs</p><p className="text-sm font-black text-blue-700">{lastPutOnBlock?.statsDetails?.batting?.boundary_runs ?? "0"}</p></div>
                                            </div>
                                        </div>

                                        {/* Bowling Column */}
                                        <div className="space-y-3 md:border-x md:border-slate-200 md:px-4">
                                            <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
                                                <svg className="h-3.5 w-3.5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M12 2c1 4 1 16 0 20" />
                                                    <path d="M12 2c-1 4-1 16 0 20" />
                                                </svg>
                                                <p className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">Bowling Stats</p>
                                            </div>
                                            <div className="grid grid-cols-3 gap-x-3 gap-y-2">
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Innings</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.bowling?.innings ?? "-"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Wickets</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.bowling?.total_wickets ?? "-"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Econ</p><p className="text-sm font-black text-blue-600">{lastPutOnBlock?.statsDetails?.bowling?.economy ?? "-"}</p></div>
                                                <div className="col-span-2"><p className="text-[9px] text-muted-foreground font-medium uppercase">Style</p><p className="text-[10px] font-black text-slate-800 leading-tight">{lastPutOnBlock?.statsDetails?.bowling?.bowling_style ?? "-"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Overs</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.bowling?.overs ?? "0"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Maidens</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.bowling?.maidens ?? "0"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Runs</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.bowling?.runs ?? "0"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Avg</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.bowling?.avg ?? "-"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Dot %</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.bowling?.dot_ball_percentage ?? "0"}%</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">WPM</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.bowling?.wickets_per_match ?? "-"}</p></div>
                                            </div>
                                        </div>

                                        {/* Fielding Column */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 border-b border-green-100 pb-1.5">
                                                <svg className="h-3.5 w-3.5 text-green-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                                                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                                                    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                                                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                                                </svg>
                                                <p className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">Fielding / WK</p>
                                                {lastPutOnBlock?.statsDetails?.fielding?.is_keeper && (
                                                    <span className="ml-auto text-[7px] font-black px-1 py-0.5 bg-green-100 text-green-700 rounded-sm uppercase border border-green-200">WK</span>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-3 gap-x-3 gap-y-2">
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Catches</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.fielding?.catches ?? "-"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Stumpings</p><p className="text-sm font-black text-green-600">{lastPutOnBlock?.statsDetails?.fielding?.stumpings ?? "-"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Run Outs</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.fielding?.run_outs ?? "-"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">C&B</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.fielding?.caught_and_bowl ?? "-"}</p></div>
                                                <div><p className="text-[9px] text-muted-foreground font-medium uppercase">Total</p><p className="text-sm font-black text-slate-800">{lastPutOnBlock?.statsDetails?.fielding?.total_dismissal ?? "-"}</p></div>
                                            </div>
                                        </div>
                                    </CardContent>

                                    {/* Footer */}
                                    <div className="px-4 md:px-6 py-3 bg-muted/20 shrink-0 flex items-center justify-between border-t shadow-inner">
                                        <div className="flex gap-3 items-center">
                                            <p className="text-[9px] font-bold uppercase text-muted-foreground hidden sm:block">Season Stats:</p>
                                            <div className="flex gap-1 items-center">
                                                <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded border border-slate-200 uppercase">
                                                    Matches: {lastPutOnBlock?.statsDetails?.total_match ?? "-"}
                                                </span>
                                                {lastPutOnBlock?.statsDetails?.is_mvp && (
                                                    <span className="text-[10px] font-black px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded border border-yellow-200 uppercase">
                                                        MVP
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-1.5">
                                                <div className="h-5 w-5 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[7px] text-white font-bold">PWR</div>
                                                <div className="h-5 w-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-[7px] text-white font-bold">FIN</div>
                                                <div className="h-5 w-5 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-[7px] text-white font-bold">EXP</div>
                                            </div>
                                            <p className="text-[9px] font-black uppercase text-slate-400 hidden sm:block">Elite Category</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </Card>
                    )}
                </div>
            </div>
        )
}