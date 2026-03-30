
"use client"

import { Team } from "../types/types"
import { PlayerDialog } from "./_components/PlayerDialog"
import { SkeletonGrid } from "./_components/SkeletonGrid"
import { TeamCard } from "./_components/TeamCard"
import { useViewAllTeams } from "./_hooks/useViewAllTeams"



export default function ViewAllTeams() {
    const {
        teams,
        isLoading,
        selectedPlayer,
        selectedStats,
        dialogOpen,
        setDialogOpen,
        handlePlayerClick,
    } = useViewAllTeams()

    return (
        <div className="p-4 bg-slate-50 min-h-screen">
            {isLoading ? (
                <SkeletonGrid />
            ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {teams.map((team:Team) => (
                        <TeamCard
                            key={team._id}
                            team={team}
                            onPlayerClick={handlePlayerClick}
                        />
                    ))}
                </div>
            )}

            <PlayerDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                player={selectedPlayer}
                stats={selectedStats}
            />
        </div>
    )
}