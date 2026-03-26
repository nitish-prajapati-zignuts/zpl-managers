"use client"

import * as React from "react"
import { Wallet, CircleDollarSign, Users, Trophy, ChevronRight, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
    // Static Data for demonstration
    const stats = {
        totalBudget: 100000000, // 10 Cr
        remainingBudget: 45500000, // 4.55 Cr
        totalPlayers: 14,
        maxSquadSize: 25,
    }

    const staticSoldPlayers = [
        { id: 1, name: "Virat Kohli", role: "Batter", price: "18,00,00,000" },
        { id: 2, name: "Jasprit Bumrah", role: "Bowler", price: "15,00,00,000" },
        { id: 3, name: "Rashid Khan", role: "All-Rounder", price: "12,00,00,000" },
        { id: 4, name: "Glenn Maxwell", role: "All-Rounder", price: "11,00,00,000" },
    ]

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* --- SECTION 1: TOP BUDGET CARDS (2 COLUMNS) --- */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="shadow-sm border-l-4 border-l-blue-600">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Total Budget
                        </CardTitle>
                        <Wallet className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tight">₹{stats.totalBudget.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1 font-medium italic">Initial Purse Allocation</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-l-4 border-l-green-600">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            Remaining Budget
                        </CardTitle>
                        <CircleDollarSign className="h-5 w-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-700 tracking-tight">₹{stats.remainingBudget.toLocaleString()}</div>
                        <p className="text-xs text-green-600/80 mt-1 font-bold">45.5% of total purse remaining</p>
                    </CardContent>
                </Card>
            </div>

            {/* --- SECTION 2: SQUAD OVERVIEW (3 COLUMNS) --- */}
            <div className="grid gap-4 md:grid-cols-3 shrink-0">
                {/* Financial Summary - 66% Width + Increased Height */}
                <Card className="md:col-span-2 shadow-sm border-l-4 border-l-blue-600 bg-card h-96 flex flex-col overflow-hidden">
                    {/* 1. Header: Player Identity */}
                    <CardHeader className="pb-0 pt-6 flex flex-row items-center gap-6 shrink-0">
                        <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-blue-50 to-muted flex items-center justify-center border-2 border-blue-100 shrink-0 overflow-hidden shadow-sm">
                            {/* Placeholder for player image */}
                            <User className="h-12 w-12 text-blue-300" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-tighter">
                                    Active Bid
                                </span>
                                <CardTitle className="text-[12px] font-bold text-muted-foreground uppercase tracking-widest">
                                    Current Player Profile
                                </CardTitle>
                            </div>
                            <h2 className="text-5xl font-black tracking-tighter uppercase italic text-slate-900">
                                Rishabh Pant
                            </h2>
                            <div className="flex gap-2 mt-1">
                                <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold uppercase border border-slate-200">
                                    Wicketkeeper Batter
                                </span>
                                <span className="px-3 py-1 rounded-md bg-orange-50 text-orange-700 text-[10px] font-bold uppercase border border-orange-100">
                                    Left Handed
                                </span>
                            </div>
                        </div>
                    </CardHeader>

                    {/* 2. Content: The Stats Grid (Expanded) */}
                    <CardContent className="flex-1 mt-6 grid grid-cols-3 gap-6 py-6 border-t bg-slate-50/30">
                        {/* Batting Column */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 border-b border-blue-100 pb-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                <p className="text-[11px] font-black text-slate-700 uppercase tracking-tighter">Batting Stats</p>
                            </div>
                            <div className="grid grid-cols-2 gap-y-4">
                                <div><p className="text-[10px] text-muted-foreground font-medium uppercase">Runs</p><p className="text-lg font-black text-slate-800">2,838</p></div>
                                <div><p className="text-[10px] text-muted-foreground font-medium uppercase">Strike Rate</p><p className="text-lg font-black text-blue-600">147.5</p></div>
                                <div><p className="text-[10px] text-muted-foreground font-medium uppercase">Average</p><p className="text-lg font-black text-slate-800">34.6</p></div>
                                <div><p className="text-[10px] text-muted-foreground font-medium uppercase">Highest</p><p className="text-lg font-black text-slate-800">128*</p></div>
                            </div>
                        </div>

                        {/* Bowling Column */}
                        <div className="space-y-4 border-x border-slate-200 px-6">
                            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                                <div className="h-2 w-2 rounded-full bg-slate-300" />
                                <p className="text-[11px] font-black text-slate-700 uppercase tracking-tighter">Bowling Stats</p>
                            </div>
                            <div className="grid grid-cols-2 gap-y-4 opacity-40">
                                <div><p className="text-[10px] text-muted-foreground font-medium uppercase">Wickets</p><p className="text-lg font-black">--</p></div>
                                <div><p className="text-[10px] text-muted-foreground font-medium uppercase">Economy</p><p className="text-lg font-black">--</p></div>
                                <div><p className="text-[10px] text-muted-foreground font-medium uppercase">Innings</p><p className="text-lg font-black">--</p></div>
                                <div><p className="text-[10px] text-muted-foreground font-medium uppercase">Best</p><p className="text-lg font-black">--</p></div>
                            </div>
                        </div>

                        {/* Fielding Column */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 border-b border-green-100 pb-2">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <p className="text-[11px] font-black text-slate-700 uppercase tracking-tighter">Fielding / WK</p>
                            </div>
                            <div className="grid grid-cols-2 gap-y-4">
                                <div><p className="text-[10px] text-muted-foreground font-medium uppercase">Catches</p><p className="text-lg font-black text-slate-800">64</p></div>
                                <div><p className="text-[10px] text-muted-foreground font-medium uppercase">Stumpings</p><p className="text-lg font-black text-green-600">18</p></div>
                                <div><p className="text-[10px] text-muted-foreground font-medium uppercase">Dismissals</p><p className="text-lg font-black text-slate-800">82</p></div>
                                <div><p className="text-[10px] text-muted-foreground font-medium uppercase">Direct Hits</p><p className="text-lg font-black text-slate-800">12</p></div>
                            </div>
                        </div>
                    </CardContent>

                    {/* 3. Scouting Footer: Recent Form / Skill Tags */}
                    <div className="px-6 py-4 bg-white shrink-0 flex items-center justify-between border-t">
                        <div className="flex gap-4 items-center">
                            <p className="text-[10px] font-bold uppercase text-muted-foreground">Recent Form:</p>
                            <div className="flex gap-1">
                                {['51', '28', '102*', '44', '12'].map((score, i) => (
                                    <span key={i} className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 rounded border border-slate-200">
                                        {score}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                <div className="h-6 w-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold tracking-tighter">PWR</div>
                                <div className="h-6 w-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold tracking-tighter">FIN</div>
                                <div className="h-6 w-6 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold tracking-tighter">EXP</div>
                            </div>
                            <p className="text-[10px] font-black uppercase text-slate-400">Elite Category Player</p>
                        </div>
                    </div>
                </Card>

                {/* Squad Progress - 33% Width + Matches Height */}
                <Card className="bg-primary/5 border-dashed border-primary/20 h-48 flex flex-col justify-between">
                    <CardHeader className="pb-0 pt-6">
                        <CardTitle className="text-[12px] font-bold uppercase flex items-center gap-2 text-primary tracking-widest">
                            <Users className="h-4 w-4" /> Squad Total
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="py-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black italic text-primary">{stats.totalPlayers}</span>
                            <span className="text-xl font-bold text-muted-foreground">/ {stats.maxSquadSize}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 mt-4 overflow-hidden shadow-inner">
                            <div
                                className="bg-primary h-full transition-all duration-700 ease-in-out"
                                style={{ width: `${(stats.totalPlayers / stats.maxSquadSize) * 100}%` }}
                            />
                        </div>
                    </CardContent>
                    <div className="px-6 pb-6">
                        <div className="flex justify-between items-center text-[11px] font-bold uppercase">
                            <span className="text-muted-foreground">Available Spots</span>
                            <span className="text-primary bg-primary/10 px-2 py-0.5 rounded">{stats.maxSquadSize - stats.totalPlayers} Left</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* --- SECTION 3: SOLD PLAYERS TABLE --- */}
            <Card className="shadow-none border-none bg-transparent">
                <CardHeader className="px-0">
                    <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <CardTitle className="text-lg font-bold">Recently Purchased Players</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="rounded-xl border bg-card overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold text-muted-foreground uppercase text-[10px]">Player Info</th>
                                    <th className="px-6 py-4 text-left font-bold text-muted-foreground uppercase text-[10px]">Role</th>
                                    <th className="px-6 py-4 text-right font-bold text-muted-foreground uppercase text-[10px]">Winning Bid</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-muted/50">
                                {staticSoldPlayers.map((player) => (
                                    <tr key={player.id} className="group hover:bg-muted/20 transition-colors">
                                        <td className="px-6 py-4 font-bold flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-black text-muted-foreground">
                                                {player.name.charAt(0)}
                                            </div>
                                            {player.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-secondary px-2 py-0.5 rounded text-[10px] font-bold">
                                                {player.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-black text-green-700">
                                            ₹{player.price}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}