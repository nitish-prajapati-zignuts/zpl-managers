import { Users } from "lucide-react"
import { Player, PlayerStats } from "@/app/types/types"
import { PlayerRow } from "./PlayerRow"
import { findStatsForPlayer } from "@/app/constants"


interface PlayerRosterProps {
    players: Player[]
    playerStats: PlayerStats[]
    teamColor: string
    onPlayerClick: (player: Player, stats: PlayerStats | null) => void
}

export function PlayerRoster({ players, playerStats, teamColor, onPlayerClick }: PlayerRosterProps) {
    if (players.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full py-8 text-[#3a3a58]">
                <Users className="mb-2 opacity-30" size={32} />
                <span className="text-xs font-bold uppercase tracking-widest">No players yet</span>
            </div>
        )
    }

    return (
        <>
            {players.map((player:Player, idx:number) => (
                <PlayerRow
                    key={idx}
                    player={player}
                    index={idx}
                    stats={findStatsForPlayer(playerStats, player._id)}
                    teamColor={teamColor}
                    onClick={onPlayerClick}
                />
            ))}
        </>
    )
}