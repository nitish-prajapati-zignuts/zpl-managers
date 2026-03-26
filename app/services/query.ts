import { useQuery } from "@tanstack/react-query"
import { getPlayers } from "../api/action"

export const useTeamPlayers = () => {
    return useQuery({
        queryKey: ["team-players"],
        queryFn: () => getPlayers(),
    })
}