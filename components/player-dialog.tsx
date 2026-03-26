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
                                <StatBox label="Strike Rate" value={stats?.batting?.strike_rate || 0} />
                                <StatBox label="50/100" value={`${stats?.batting?.["50s"] || 0}/${stats?.batting?.["100s"] || 0}`} />
                                <StatBox label="4s/6s" value={`${stats?.batting?.["4s"] || 0}/${stats?.batting?.["6s"] || 0}`} />
                                <StatBox label="Highest Run" value={stats?.batting?.highest_run || 0} />
                                <StatBox label="Boundary Percentage" value={stats.batting.boundary_percentage > 0 ? stats?.batting.boundary_percentage + "%" : "N/A"} />
                            </Section>

                            <Section title="Bowling">
                                <StatBox label="Wickets" value={stats?.bowling?.total_wickets || 0} />
                                <StatBox label="Eco" value={stats?.bowling?.economy || 0} />
                                <StatBox label="Strike Rate" value={stats?.bowling?.strike_rate || 0} />
                                <StatBox label="Dot Percentage" value={stats?.bowling?.dot_ball_percentage > 0 ? stats?.bowling.dot_ball_percentage + "%" : "N/A"} />
                                <StatBox label="Average" value={stats?.bowling?.avg || 0} />
                            </Section>

                            <Section title="Fielding">
                                <StatBox label="Catches" value={stats?.fielding?.catches || 0} />
                                <StatBox label="Run Outs" value={stats?.fielding?.run_outs || 0} />
                                <StatBox label="Dismissals" value={stats?.fielding?.total_dismissal || 0} />
                                <StatBox label="Stumping Dismissal" value={stats?.fielding?.stumpings || 0} />
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

const LIGHT_COLORS = [
    "bg-red-50",
    "bg-blue-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-purple-50",
    "bg-pink-50",
    "bg-indigo-50",
    "bg-teal-50",
    "bg-orange-50",
];

function Section({ title, children }: any) {
    return (
        <div className="space-y-4">
            <p className="text-[10px] font-black uppercase text-slate-400">{title}</p>
            <div className="grid grid-cols-4 gap-2">{children}</div>
        </div>
    )
}

function getRandomColor() {
    return LIGHT_COLORS[Math.floor(Math.random() * LIGHT_COLORS.length)];
}

const GRADIENTS = [
    "from-red-50 to-red-100",
    "from-blue-50 to-blue-100",
    "from-green-50 to-green-100",
    "from-yellow-50 to-yellow-100",
    "from-purple-50 to-purple-100",
    "from-pink-50 to-pink-100",
    "from-indigo-50 to-indigo-100",
    "from-teal-50 to-teal-100",
    "from-orange-50 to-orange-100",
];

function getGradient(label: string) {
    const index = label.charCodeAt(0) % GRADIENTS.length;
    return GRADIENTS[index];
}

function StatBox({ label, value, className = "" }: any) {
    const gradient = getGradient(label);

    return (
        <div
            className={`
                group relative overflow-hidden
                p-4 rounded-2xl border
                bg-gradient-to-br ${gradient}
                shadow-sm hover:shadow-md
                transition-all duration-300
                hover:-translate-y-1
            `}
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-white/30 blur-xl" />

            {/* Content */}
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                {label}
            </span>

            <p className={`text-lg font-extrabold text-slate-800 ${className}`}>
                {value}
            </p>

            {/* Accent Line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-slate-700 group-hover:w-full transition-all duration-300 rounded-full" />
        </div>
    );
}