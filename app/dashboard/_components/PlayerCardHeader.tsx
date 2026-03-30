import { User } from "lucide-react"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { AuctionLog } from "@/app/types/types"

interface PlayerCardHeaderProps {
    log: AuctionLog
}

export function PlayerCardHeader({ log }: PlayerCardHeaderProps) {
    const player = log.playerDetails
    const status = player?.status

    const statusColor =
        status === "sold" ? "bg-green-600 animate-bounce" :
        status === "unsold" ? "bg-red-600" :
        "bg-blue-600"

    const avatarBorder =
        status === "sold" ? "border-green-100 bg-green-50" :
        status === "unsold" ? "border-red-100 bg-red-50" :
        "border-blue-100 bg-blue-50"

    const avatarIcon =
        status === "sold" ? "text-green-300" :
        status === "unsold" ? "text-red-300" :
        "text-blue-300"

    return (
        <CardHeader className="pb-0 pt-4 px-4 md:px-6 flex flex-row items-center gap-3 md:gap-6 shrink-0">
            {/* Avatar */}
            <div className={`h-16 w-16 md:h-24 md:w-24 rounded-xl md:rounded-2xl flex items-center justify-center border-2 shrink-0 overflow-hidden shadow-sm transition-colors duration-500 ${avatarBorder}`}>
                {player?.photoUrl ? (
                    <img
                        src={player.photoUrl}
                        alt={player.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <User className={`h-8 w-8 md:h-12 md:w-12 transition-colors duration-500 ${avatarIcon}`} />
                )}
            </div>

            {/* Name & Info */}
            <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-white text-[9px] font-black uppercase tracking-tighter transition-colors duration-500 ${statusColor}`}>
                        {status?.replace("_", " ") || log.action || "Active Bid"}
                    </span>
                    <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Current Player
                    </CardTitle>
                </div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic text-slate-900 truncate leading-tight">
                    {player?.name}
                </h2>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xl md:text-2xl font-black text-blue-700 tracking-tighter">
                        ₹{log.basePrice?.toLocaleString()}
                    </span>
                    <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Base Price</span>
                </div>
                <div className="flex gap-1.5 mt-0.5 flex-wrap">
                    {player?.role && (
                        <span className="px-2 py-0.5 rounded-md bg-white/50 text-slate-700 text-[9px] font-black uppercase border border-slate-200">
                            {player.role}
                        </span>
                    )}
                    {player?.grade && (
                        <span className="px-2 py-0.5 rounded-md bg-white/50 text-orange-700 text-[9px] font-black uppercase border border-orange-200">
                            Grade {player.grade}
                        </span>
                    )}
                </div>
            </div>
        </CardHeader>
    )
}