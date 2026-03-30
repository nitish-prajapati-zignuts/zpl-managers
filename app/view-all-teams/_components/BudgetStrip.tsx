import { accentColor, formatAmount } from "@/app/constants"


interface BudgetStripProps {
    spent: number
    remaining: number
    teamColor: string
}

export function BudgetStrip({ spent, remaining, teamColor }: BudgetStripProps) {
    return (
        <div className="flex border-b">
            <div className="flex-1 p-2 text-center border-r border-[#2a2a3d]">
                <p className="text-[14px] text-[#4a4a66] uppercase font-black tracking-tighter">Spent</p>
                <p className="text-sm font-bold">{formatAmount(spent)}</p>
            </div>
            <div className="flex-1 p-2 text-center">
                <p className="text-[14px] text-[#4a4a66] uppercase font-black tracking-tighter">Remaining</p>
                <p className="text-sm font-bold" style={{ color: accentColor(teamColor) }}>
                    {formatAmount(remaining)}
                </p>
            </div>
        </div>
    )
}