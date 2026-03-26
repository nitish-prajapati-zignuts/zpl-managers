import axios from "axios";
import { PlayersResponse } from "../types/types";

//const BASE_URL = "https://zpl-4h67.onrender.com/api"
const BASE_URL_LOCAL = "https://mikki-noncredent-darius.ngrok-free.dev/api/"



export const api = axios.create({
    baseURL: BASE_URL_LOCAL,
    headers: {
        "ngrok-skip-browser-warning": "true",
    },
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