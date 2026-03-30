import { Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { AuctionLog } from "@/app/types/types"
import { PlayerCardHeader } from "./PlayerCardHeader"
import { SoldState } from "./SoldState"
import { OnBlockStats } from "./OnBlockStats"
import { WaitingState } from "./WaitingState"
import { UnsoldState } from "./UnsoldState"

interface PlayerIdentityCardProps {
    log: AuctionLog | undefined
    isLoading: boolean
}

export function PlayerIdentityCard({ log, isLoading }: PlayerIdentityCardProps) {
    const status = log?.playerDetails?.status

    const borderColor =
        status === "sold" ? "border-l-green-600 ring-1 ring-green-600/20" :
            status === "unsold" ? "border-l-red-600 ring-1 ring-red-600/20" :
                status === "on_block" ? "border-l-blue-600 shadow-blue-100/50 shadow-lg" :
                    "border-l-blue-600"

    if (isLoading) {
        return (
            <Card className="h-full flex items-center justify-center animate-pulse border-l-4 border-l-muted">
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <Users className="h-10 w-10 opacity-20" />
                    <p className="text-xs font-black uppercase tracking-widest opacity-50">Syncing Auction Data...</p>
                </div>
            </Card>
        )
    }

    if (!log?.playerDetails) {
        return <WaitingState />
    }

    return (
        <Card className={`h-full flex flex-col overflow-hidden shadow-sm border-l-4 bg-card transition-all duration-500 ${borderColor}`}>
            <PlayerCardHeader log={log} />

            {status === "sold" && <SoldState log={log} />}
            {status === "unsold" && <UnsoldState />}
            {status !== "sold" && status !== "unsold" && <OnBlockStats log={log} />}
        </Card>
    )
}