import { Users, Award, Clock } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Player, PlayerStats } from "@/app/types/types"
import { getRoleIcon } from "./RoleIcons"
import { formatAmount } from "@/app/constants"

interface PlayerDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    player: Player | null
    stats: PlayerStats | null
}

export function PlayerDialog({ open, onOpenChange, player, stats }: PlayerDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md border-none shadow-2xl overflow-hidden rounded-3xl p-0">
                <div className="bg-slate-900 p-8 text-white relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Users size={120} />
                    </div>
                    <DialogHeader className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic">
                                Player Profile
                            </span>
                            <div className="p-1 rounded bg-white/10 backdrop-blur-sm">
                                {getRoleIcon(player?.role)}
                            </div>
                            {player?.grade && (
                                <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                                    Grade {player.grade}
                                </span>
                            )}
                        </div>
                        <DialogTitle className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-1">
                            {player?.name}
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 font-bold uppercase text-[11px] tracking-widest italic">
                            Season {stats?.season ?? "2025"} • {player?.soldTo ?? "Official Squad Member"}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-8 bg-white grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner">
                            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 font-mono">
                                Sold Price
                            </span>
                            <p className="text-3xl font-black text-slate-900 italic tracking-tighter leading-none">
                                ₹{player?.finalAmount ? formatAmount(player.finalAmount) : "—"}
                            </p>
                        </div>
                        <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner flex flex-col justify-center items-center">
                            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 font-mono">
                                Status
                            </span>
                            <div className="flex items-center gap-1.5">
                                <div className={`h-2 w-2 rounded-full ${player?.status === "sold" ? "bg-green-500 animate-pulse" : "bg-yellow-400"}`} />
                                <p className={`text-xl font-black uppercase italic tracking-tight ${player?.status === "sold" ? "text-green-600" : "text-yellow-600"}`}>
                                    {player?.status ?? "—"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <span className="block text-[10px] font-black uppercase text-slate-400 tracking-widest font-mono">
                            Season Stats
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: "Matches", value: stats?.total_match ?? 0 },
                                { label: "Runs", value: stats?.batting?.total_runs ?? 0 },
                                { label: "Wickets", value: stats?.bowling?.total_wickets ?? 0 },
                                { label: "SR", value: stats?.batting?.strike_rate ?? 0 },
                                { label: "Economy", value: stats?.bowling?.economy ?? 0 },
                                { label: "Catches", value: stats?.fielding?.total_catches ?? 0 },
                            ].map(({ label, value }) => (
                                <div key={label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                    <span className="block text-[8px] font-black uppercase text-slate-400 mb-1">{label}</span>
                                    <p className="text-xl font-black text-slate-900">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all cursor-default group">
                            <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                <Award className="h-6 w-6 text-slate-500 group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900 uppercase italic leading-none mb-1">Performance Tier</p>
                                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                                    {stats?.is_mvp ? "MVP • Top Tier" : `Grade ${player?.grade ?? "—"} Standard`}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all cursor-default group">
                            <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                <Clock className="h-6 w-6 text-slate-500 group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900 uppercase italic leading-none mb-1">Availability</p>
                                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                                    {player?.isRetained ? "Retained Player" : "Auction Acquisition"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => onOpenChange(false)}
                        className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 italic"
                    >
                        Close Profile
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}