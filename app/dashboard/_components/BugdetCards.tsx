import { Wallet, CircleDollarSign, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardStats } from "@/app/types/types"

interface BudgetCardsProps {
    stats: DashboardStats
}

export function BudgetCards({ stats }: BudgetCardsProps) {
    const budgetPct = Math.round((stats.remainingBudget / stats.totalBudget) * 100)
    const squadPct = (stats.totalPlayers / stats.maxSquadSize) * 100

    return (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 shrink-0">
            <Card className="shadow-sm border-l-4 border-l-blue-600">
                <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-4">
                    <CardTitle className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Total Budget
                    </CardTitle>
                    <Wallet className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent className="px-4 pb-3">
                    <div className="text-xl md:text-2xl font-bold tracking-tight">
                        ₹{stats.totalBudget.toLocaleString()}
                    </div>
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
                    <div className="text-xl md:text-2xl font-bold text-green-700 tracking-tight">
                        ₹{stats.remainingBudget.toLocaleString()}
                    </div>
                    <p className="text-[10px] text-green-600/80 mt-0.5 font-bold">{budgetPct}% remaining</p>
                </CardContent>
            </Card>

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
                            style={{ width: `${squadPct}%` }}
                        />
                    </div>
                </CardContent>
                <div className="px-4 pb-4">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                        <span className="text-muted-foreground">Available Spots</span>
                        <span className="text-primary bg-primary/10 px-2 py-0.5 rounded">
                            {stats.maxSquadSize - stats.totalPlayers} Left
                        </span>
                    </div>
                </div>
            </Card>
        </div>
    )
}