import axios from "axios";
import { Log, LogResponse, PlayersResponse } from "../types/types";

const BASE_URL = "https://mikki-noncredent-darius.ngrok-free.dev/api"

export const api = axios.create({
    baseURL: BASE_URL,
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