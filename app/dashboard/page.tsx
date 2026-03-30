"use client"


import { PlayerIdentityCard } from "@/app/dashboard/_components/PlayerIdentityCard"
import { useDashboard } from "./hooks/useDashboard"
import { BudgetCards } from "./_components/BugdetCards"
import { DASHBOARD_STATS } from "../constants"



export default function DashboardPage() {
    const { lastPutOnBlock, isLoading } = useDashboard()

    return (
        <div className="flex flex-col gap-6 p-6 md:p-4">
            <BudgetCards stats={DASHBOARD_STATS} />

            <div className="flex-1 min-h-0 transition-all duration-700 animate-in fade-in slide-in-from-bottom-4">
                <PlayerIdentityCard log={lastPutOnBlock} isLoading={isLoading} />
            </div>
        </div>
    )
}