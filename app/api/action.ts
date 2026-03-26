import axios from "axios";
import { Log, LogResponse, PlayersResponse } from "../types/types";

// const BASE_URL = "https://mikki-noncredent-darius.ngrok-free.dev/api"
const BASE_URL = "https://zpl-4h67.onrender.com/api"
export const api = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //     "ngrok-skip-browser-warning": "true",
    // },
});

export const getPlayers = async (): Promise<PlayersResponse> => {
    try {
        const response = await api.get("/players");
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching players:", error);
        throw new Error("Failed to get Players")
    }
}

export const getLogs = async (): Promise<Log[]> => {
    try {
        const response = await api.get("/logs");
        console.log(response.data)

        return response.data.data;
    } catch (error) {
        console.error("Error fetching logs:", error);
        throw new Error("Failed to get Logs")
    }
}
export const getSinglePlayerStats = async (id: string) => {
    try {
        const response = await api.get(`/players/${id}/stats`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching players:", error);
        throw new Error("Failed to get Players")
    }
}

export const getTeams = async () => {
    try {
        const response = await api.get("/teams");
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw new Error("Failed to get Teams")
    }
}
export const getSingleTeam = async (id: string) => {
    try {
        const response = await api.get(`/teams/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw new Error("Failed to get Teams")
    }
}

export const login = async ({ email, password }: { email: string, password: string }) => {
    try {
        const response = await api.post("/auth/login", {
            email, password
        })
        return response.data;
    }
    catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Failed to log in")
    }
}