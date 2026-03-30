import { Trophy } from "lucide-react"
import { CardContent } from "@/components/ui/card"
import { AuctionLog } from "@/app/types/types"

interface SoldStateProps {
    log: AuctionLog
}

export function SoldState({ log }: SoldStateProps) {
    const teamName = log.teamName || log.playerDetails?.soldTo || "Marvel Monsters"
    const finalAmount = (log.amount || log.playerDetails?.finalAmount)?.toLocaleString() || "-"

    return (
        <CardContent className="flex-1 min-h-0 mt-4 flex flex-col items-center justify-center bg-green-50/30 border-t border-green-100 py-6 animate-in zoom-in-95 duration-500 overflow-auto">
            <div className="relative">
                <Trophy className="h-20 w-20 md:h-28 md:w-28 text-yellow-500 animate-pulse" />
                <div className="absolute -top-3 -right-3 bg-green-600 text-white px-3 py-0.5 rounded-full text-[9px] font-black rotate-12 shadow-lg ring-2 ring-white">
                    SOLD!
                </div>
            </div>
            <div className="text-center mt-6 space-y-1.5">
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest">Acquired by</p>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                    {teamName}
                </h3>
                <div className="pt-4">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Final Bid Amount</p>
                    <p className="text-3xl md:text-4xl font-black text-green-700 tracking-tighter">
                        ₹{finalAmount}
                    </p>
                </div>
            </div>
        </CardContent>
    )
}