import { useMutation, useQuery } from "@tanstack/react-query"
import { changePassword, getLogs, getSingleTeam, login } from "../api/action"
import { getPlayers, getSinglePlayerStats, getTeams } from "../api/action"
import { TeamsResponse } from "../types/types"

export const useTeamPlayers = () => {
    return useQuery({
        queryKey: ["team-players"],
        queryFn: () => getPlayers(),
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}

export const useTeamPlayerById = (id: string) => {
    return useQuery({
        queryKey: ["team-player", id],
        queryFn: () => getSinglePlayerStats(id),
        enabled: !!id,
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}

export const useTeams = () => {
    return useQuery<TeamsResponse>({
        queryKey: ["teams"],
        queryFn: () => getTeams(),
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}

export const useLogs = () => useQuery({
    queryKey: ["logs"],
    queryFn: getLogs,
    refetchInterval: 3000,
    refetchIntervalInBackground: true

});

export const useLogin = () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (credentials: { email: string; password: string }) => login(credentials),
    });
};

export const useGetSingleTeam = (id: string) => {
    return useQuery({
        queryKey: ["single-team", id],
        queryFn: () => getSingleTeam(id),
        enabled: !!id,
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}

export const useChangePassword = () => {
    return useMutation({
        mutationKey: ['change-password'],
        mutationFn: (data: { id: string; originalPassword: string; newPassword: string }) => changePassword(data),
    });
};