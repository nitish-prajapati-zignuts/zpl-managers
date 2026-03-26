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

export type TeamsResponse = {
    success: boolean;
    count: number;
    data: Team[];
};

export type Team = {
    _id: string;
    name: string;
    captainName: string;
    managerName: string;
    totalBudget: number;
    budgetRemaining: number;
    players: Player[];
    playerStats: PlayerStats[];
    createdAt: string;
    updatedAt: string;
};

export type PlayerRole =
    | "batsmen"
    | "bowler"
    | "allrounder"
    | "wicketkeeper";

export type PlayerStatus = "sold" | "unsold";

export type Gender = "male" | "female";



export type PlayerStats = {
    _id: string;
    playerRef: string;
    season: string;
    externalPlayerId: number;
    total_match: number;
    is_mvp: boolean;
    batting: BattingStats;
    bowling: BowlingStats;
    fielding: FieldingStats;
    createdAt: string;
    updatedAt: string;
};

export type BattingStats = {
    innings: number;
    total_runs: number;
    highest_run: number;
    average: number | string; // "-" case
    not_out: number;
    strike_rate: number;
    ball_faced: number;
    batting_hand: string;
    "4s": number;
    "6s": number;
    "50s": number;
    "100s": number;
    boundary_runs: number;
    boundary_percentage: number;
    runs_per_match: number;
    is_centurion: boolean;
    is_half_centurion: boolean;
    is_aggressive: boolean;
    is_consistent: boolean;
    is_anchor: boolean;
};

export type BowlingStats = {
    innings: number;
    total_wickets: number;
    balls: number;
    highest_wicket: number;
    economy: number;
    maidens: number;
    avg: number;
    runs: number;
    bowling_style: string;
    overs: number;
    dot_balls: number;
    strike_rate: number;
    dot_ball_percentage: number;
    wickets_per_match: number;
    is_five_wicket_haul: boolean;
    is_economical: boolean;
    is_wicket_taker: boolean;
    is_spinner: boolean;
};

export type FieldingStats = {
    catches: number;
    caught_behind: number;
    run_outs: number;
    assist_run_outs: number;
    stumpings: number;
    caught_and_bowl: number;
    total_catches: number;
    total_dismissal: number;
    dismissals_per_match: number;
    is_keeper: boolean;
    is_safe_hands: boolean;
    is_sharp_fielder: boolean;
};