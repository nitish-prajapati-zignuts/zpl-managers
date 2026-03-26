import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format rupees: if >= 10,00,000 show in Cr, else in L
export const formatAmount = (amount: number): string => {
    if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `${(amount / 100000).toFixed(1)} L`
    return `${(amount / 1000).toFixed(0)}K`
}

// Map player role string from API to display role label or icon if needed
// For now, returning formatted role name
export const getRoleLabel = (role: string) => {
    switch (role?.toLowerCase()) {
        case "batsmen":
        case "batsman":
            return "Batsman"
        case "bowler":
        case "bowling":
            return "Bowler"
        case "fielder":
        case "fielding":
            return "Fielder"
        case "wicketkeeper":
        case "wk":
        case "keeper":
            return "Wicketkeeper"
        default:
            return role || "Player"
    }
}

// Check if a color is light or dark for text contrast
export const isLightColor = (color: string) => {
    if (!color) return false
    const hex = color.replace('#', '');
    if (hex.length !== 6) return false;
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
};
