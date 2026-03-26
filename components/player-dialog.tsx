"use client"

import * as React from "react"
import { User, Clock, Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useTeamPlayerById } from "@/app/services/query"
import { Button } from "./ui/button"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    player: any
}
export function PlayerDialog({ open, onOpenChange, player }: Props) {
    // 1. Extract ID safely and prevent API call if missing
    const playerId = typeof player === 'string' ? player : player?._id;

    const { data: playerStats, isLoading } = useTeamPlayerById(playerId);

    if (!player) return null;

    const stats = playerStats?.data;
    const hasStats = stats && (stats.batting || stats.bowling || stats.fielding);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-black uppercase italic flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        Player Profile
                    </DialogTitle>
                    <DialogDescription>
                        Full auction details and performance metrics.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* --- NEW TOP INFO SECTION --- */}
                    <div className="relative overflow-hidden rounded-xl border bg-slate-900 p-4 text-white shadow-md">
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-black uppercase italic leading-none mb-1">
                                    {player?.name}
                                </h2>
                                <span className="inline-block px-2 py-0.5 rounded bg-primary text-[10px] font-bold uppercase tracking-wider">
                                    {player?.role || "Player"}
                                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold uppercase text-slate-400">Base Price</p>
                                <p className="text-lg font-black text-yellow-500">
                                    ₹{player?.basePrice?.toLocaleString() ?? "0"}
                                </p>
                            </div>
                        </div>
                        {/* Subtle background decoration */}
                        <div className="absolute -right-4 -bottom-4 opacity-10">
                            <User size={100} />
                        </div>
                    </div>

                    {/* Status Box */}
                    <div className="grid grid-cols-1 gap-4">
                        <StatBox
                            label="Current Auction Status"
                            value={player?.status || "Pending"}
                            className={
                                player?.status?.toLowerCase() === "sold"
                                    ? "text-green-600"
                                    : player?.status?.toLowerCase() === "unsold"
                                        ? "text-red-600"
                                        : "text-yellow-600"
                            }
                        />
                    </div>

                    {/* Sold Info (Only if Sold) */}
                    {player?.status?.toLowerCase() === "sold" && (
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                            <div className="flex justify-between mb-2">
                                <span className="text-[10px] font-black text-blue-400 uppercase">Winning Bid</span>
                                <span className="text-[10px] bg-blue-600 text-white px-2 rounded">SOLD</span>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-[10px] text-blue-400 uppercase">Team</p>
                                    <p className="font-black text-blue-900">{player?.soldTo}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-blue-400 uppercase">Amount</p>
                                    <p className="font-black text-blue-700 text-xl">
                                        ₹{player?.finalAmount?.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Statistics Section */}
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-2 text-muted-foreground">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <p className="text-sm font-medium">Loading statistics...</p>
                        </div>
                    ) : hasStats ? (
                        <>
                            <Section title="Batting">
                                <StatBox label="Runs" value={stats?.batting?.total_runs || 0} />
                                <StatBox label="Avg" value={stats?.batting?.average || 0} />
                                <StatBox label="SR" value={stats?.batting?.strike_rate || 0} />
                            </Section>

                            <Section title="Bowling">
                                <StatBox label="Wickets" value={stats?.bowling?.total_wickets || 0} />
                                <StatBox label="Eco" value={stats?.bowling?.economy || 0} />
                                <StatBox label="SR" value={stats?.bowling?.strike_rate || 0} />
                            </Section>

                            <Section title="Fielding">
                                <StatBox label="Catches" value={stats?.fielding?.catches || 0} />
                                <StatBox label="Run Outs" value={stats?.fielding?.run_outs || 0} />
                                <StatBox label="Dismissals" value={stats?.fielding?.total_dismissal || 0} />
                            </Section>
                        </>
                    ) : (
                        /* Empty State Card */
                        <div className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed rounded-xl bg-slate-50/50">
                            <div className="bg-slate-200 p-3 rounded-full mb-2">
                                <User className="h-5 w-5 text-slate-400" />
                            </div>
                            <p className="text-sm font-bold text-slate-600">No Performance Data</p>
                            <p className="text-[11px] text-slate-400 text-center">
                                Statistics are currently unavailable for this player.
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Close Profile
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
/* ---------- Reusable Components ---------- */

function Section({ title, children }: any) {
    return (
        <div className="space-y-2">
            <p className="text-[10px] font-black uppercase text-slate-400">{title}</p>
            <div className="grid grid-cols-3 gap-3">{children}</div>
        </div>
    )
}

function StatBox({ label, value, className = "" }: any) {
    return (
        <div className="p-3 rounded-xl bg-slate-50 border">
            <span className="block text-[10px] font-black uppercase text-slate-400 mb-1">
                {label}
            </span>
            <p className={`text-sm font-black ${className}`}>{value}</p>
        </div>
    )
}