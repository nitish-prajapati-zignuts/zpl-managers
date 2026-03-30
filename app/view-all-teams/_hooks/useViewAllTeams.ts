"use client"

import * as React from "react"
import { useTeams } from "@/app/services/query"
import { Player, PlayerStats, Team } from "@/app/types/types"

export function useViewAllTeams() {
    const [selectedPlayer, setSelectedPlayer] = React.useState<Player | null>(null)
    const [selectedStats, setSelectedStats] = React.useState<PlayerStats | null>(null)
    const [dialogOpen, setDialogOpen] = React.useState(false)

    const { data: teamsResponse, isLoading } = useTeams()
    const teams: Team[] = teamsResponse?.data ?? []

    const handlePlayerClick = (player: Player, stats: PlayerStats | null) => {
        setSelectedPlayer(player)
        setSelectedStats(stats)
        setDialogOpen(true)
    }

    return {
        teams,
        isLoading,
        selectedPlayer,
        selectedStats,
        dialogOpen,
        setDialogOpen,
        handlePlayerClick,
    }
}