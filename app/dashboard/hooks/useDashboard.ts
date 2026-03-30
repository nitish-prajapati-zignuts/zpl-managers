import { useLogs } from "@/app/services/query"
import { AuctionLog } from "@/app/types/types"

export function useDashboard() {
    const { data: logs = [], isLoading } = useLogs()

    const logsArray: AuctionLog[] = Array.isArray(logs)
        ? logs
        : ((logs as any)?.data ?? [])

    const sorted = [...logsArray].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    const lastPutOnBlock = sorted[0] as AuctionLog | undefined

    return { lastPutOnBlock, isLoading }
}