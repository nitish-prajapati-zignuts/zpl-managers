import { PlayerStats, DashboardStats, TeamConfig } from "@/app/types/types"


export const DASHBOARD_STATS: DashboardStats = {
    totalBudget: 100000000,
    remainingBudget: 45500000,
    totalPlayers: 14,
    maxSquadSize: 25,
}


export const formatAmount = (amount: number): string => {
    if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `${(amount / 100000).toFixed(1)} L`
    return `${(amount / 1000).toFixed(0)}K`
}

export const isLightColor = (color: string): boolean => {
    const hex = color.replace("#", "")
    if (hex.length !== 6) return false
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    return (r * 299 + g * 587 + b * 114) / 1000 > 155
}

export const findStatsForPlayer = (
    playerStats: PlayerStats[],
    playerId: string
): PlayerStats | null =>
    playerStats?.find((s) => s.playerRef === playerId) ?? null

export const accentColor = (teamColor: string): string =>
    teamColor === "#000000" ? "#f0c040" : teamColor


export const TEAM_CONFIG: Record<string, TeamConfig> = {
    "THE MAVERICKS": { color: "#372267", logo: "/assets/teams/theMavericks.png", bg: "#3722671A", badgeColor: "#372267" },
    "THE MAVERICS": { color: "#372267", logo: "/assets/teams/theMavericks.png", bg: "#3722671A", badgeColor: "#372267" },
    "MARVEL MONSTER": { color: "#0F245C", logo: "/assets/teams/marvelMonster.png", bg: "#0F245C1A", badgeColor: "#0F245C" },
    "MARVEL MONSTERS": { color: "#0F245C", logo: "/assets/teams/marvelMonster.png", bg: "#0F245C1A", badgeColor: "#0F245C" },
    "GRAY MIGHTY": { color: "#9899AE", logo: "/assets/teams/grayMighty.png", bg: "#9899AE1A", badgeColor: "#9899AE" },
    "TROJAN HORSE": { color: "#D9ADE3", logo: "/assets/teams/trojanHorsh.png", bg: "#D9ADE31A", badgeColor: "#D9ADE3" },
    "STAR STRIKERS": { color: "#C63674", logo: "/assets/teams/starStriker.png", bg: "#C636741A", badgeColor: "#C63674" },
    "RED SQUAD": { color: "#640105", logo: "/assets/teams/redSquad.png", bg: "#6401051A", badgeColor: "#640105" },
    "THE TECH TITANS": { color: "#000000", logo: "/assets/teams/techTitans.png", bg: "#0000001A", badgeColor: "#000000" },
    "SUPER SMASHERS": { color: "#FFD451", logo: "/assets/teams/superSmash.png", bg: "#FFD4511A", badgeColor: "#000000" },
}

export const FALLBACK_TEAM_CONFIG: TeamConfig = {
    color: "#64748b",
    logo: null,
    bg: "#f1f5f9",
    badgeColor: "#64748b",
}