import { useQuery } from "@tanstack/react-query"
import { getLogs, getPlayers } from "../api/action"

export const useTeamPlayers = () => {
    return useQuery({
        queryKey: ["team-players"],
        queryFn: () => getPlayers(),
    })
}

export const useLogs = () => useQuery({
    queryKey: ["logs"],
    queryFn: getLogs,
    refetchInterval: 2000,
});
