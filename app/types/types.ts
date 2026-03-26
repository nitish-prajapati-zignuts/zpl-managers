export type Player = {
    _id: string;
    name: string;
    gender: "male" | "female";
    grade: string; // e.g. "D"
    role: "batsmen" | string; // extend if more roles exist
    basePrice: number;
    status: "sold" | "unsold" | "pending" | "on_block";
    soldTo: string | null;
    finalAmount: number | null;
    isRetained: boolean;
    isAuctionable: boolean;
    photoUrl: string | null;
    __v: number;
    createdAt: string; // ISO date
    updatedAt: string; // ISO date
};

export type PlayersResponse = {
    success: boolean;
    count: number;
    data: Player[];
};