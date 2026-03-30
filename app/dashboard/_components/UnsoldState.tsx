import { User } from "lucide-react"
import { CardContent } from "@/components/ui/card"

export function UnsoldState() {
    return (
        <CardContent className="flex-1 min-h-0 mt-4 flex flex-col items-center justify-center bg-red-50/30 border-t border-red-100 animate-in fade-in slide-in-from-top-4 duration-500 overflow-auto">
            <div className="flex flex-col items-center text-center gap-4">
                <div className="relative h-20 w-20 rounded-full bg-red-100 flex items-center justify-center border-4 border-white shadow-xl">
                    <User className="h-10 w-10 text-red-600 opacity-50" />
                    <div className="absolute h-20 w-20 border-4 border-red-600 rounded-full animate-ping opacity-20" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-5xl md:text-7xl font-black text-red-600 uppercase italic tracking-tighter leading-none">
                        UNSOLD
                    </h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Player returns to the auction pool
                    </p>
                </div>
                <div className="px-5 py-2 bg-red-600 text-white rounded-md text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-200">
                    Action Required: Reput on Block
                </div>
            </div>
        </CardContent>
    )
}