import axios from "axios";
import { PlayersResponse } from "../types/types";

const BASE_URL = "https://zpl-4h67.onrender.com/api"

export const api = axios.create({
    baseURL: BASE_URL,
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