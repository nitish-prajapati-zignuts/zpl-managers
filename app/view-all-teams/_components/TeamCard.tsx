import { Team, Player, PlayerStats } from "@/app/types/types"
// import { TEAM_CONFIG, FALLBACK_TEAM_CONFIG } from "@/app/constants"
import { TeamCardHeader } from "./TeamCardHeader"
import { BudgetStrip } from "./BudgetStrip"
import { PlayerRoster } from "./PlayerRoaster"
import { TeamCardFooter } from "./TeamCardFooter"
import { TEAM_CONFIG, FALLBACK_TEAM_CONFIG } from "@/app/constants"


interface TeamCardProps {
    team: Team
    onPlayerClick: (player: Player, stats: PlayerStats | null) => void
}

export function TeamCard({ team, onPlayerClick }: TeamCardProps) {
    const teamNameKey = team.name?.toUpperCase().trim() ?? ""
    const teamConfig = TEAM_CONFIG[teamNameKey] ?? FALLBACK_TEAM_CONFIG
    const teamColor = teamConfig.color
    const spent = (team.totalBudget ?? 0) - (team.budgetRemaining ?? 0)
    const remaining = team.budgetRemaining ?? 0
    const players = team.players ?? []
    const playerStats = team.playerStats ?? []

    return (
        <section
            className="flex flex-col rounded-xl shadow-2xl overflow-hidden transition-all duration-300 group min-h-[550px]"
            style={{ border: `1.5px solid ${teamColor}55` }}
        >
            <TeamCardHeader
                name={team.name}
                captainName={team.captainName}
                managerName={team.managerName}
                teamConfig={teamConfig}
            />

            <BudgetStrip
                spent={spent}
                remaining={remaining}
                teamColor={teamColor}
            />

            <div className="flex-1 overflow-y-auto custom-scrollbar-thin p-2 space-y-1">
                <PlayerRoster
                    players={players}
                    playerStats={playerStats}
                    teamColor={teamColor}
                    onPlayerClick={onPlayerClick}
                />
            </div>

            <TeamCardFooter teamColor={teamColor} />
        </section>
    )
}