import { Player, PlayerStats } from "@/app/types/types"
import { getRoleIcon } from "./RoleIcons"
import { formatAmount, accentColor } from "@/app/constants"

interface PlayerRowProps {
    player: Player
    index: number
    stats: PlayerStats | null
    teamColor: string
    onClick: (player: Player, stats: PlayerStats | null) => void
}

export function PlayerRow({ player, index, stats, teamColor, onClick }: PlayerRowProps) {
    const accent = accentColor(teamColor)

    return (
        <div
            onClick={() => onClick(player, stats)}
            className="flex justify-between items-center px-3 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-all cursor-pointer hover:bg-white/5"
            style={{ backgroundColor: `${teamColor}12` }}
        >
            <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-[9px] text-[#4a4a66] w-4 font-bold shrink-0">{index + 1}.</span>
                <span className="text-xs text-gray-800 font-medium truncate uppercase tracking-tight">
                    {player.name}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <div className="opacity-20">{getRoleIcon(player.role)}</div>
                <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0"
                    style={{
                        color: accent,
                        backgroundColor: `${accent}18`,
                    }}
                >
                    {player.finalAmount
                        ? formatAmount(player.finalAmount)
                        : `₹${player.basePrice} L`}
                </span>
            </div>
        </div>
    )
}