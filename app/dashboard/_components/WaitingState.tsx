import { Users } from "lucide-react"
import { Card } from "@/components/ui/card"

export function WaitingState() {
    return (
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
    )
}