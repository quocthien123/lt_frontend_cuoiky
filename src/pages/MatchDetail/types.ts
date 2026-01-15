export interface Player {
    id: string;
    name: string;
    number: number;
    position: string;
    captain: boolean;
    first: boolean;
}

export interface MatchEvent {
    type: number;
    time: number;
    player_name?: string;
    home_score?: number;
    away_score?: number;
}

export interface MatchHistory {
    start_time: string;
    home_name: string;
    away_name: string;
    goals_home: number;
    goals_away: number;
}

export interface MatchData {
    home_name: string;
    away_name: string;
    home_logo: string;
    away_logo: string;
    goals_home: number;
    goals_away: number;
    status: number;
    play_time: string;
    start_time: string;
    home_lineup: {
        formation: string;
        lineups: Player[];
    };
    away_lineup: {
        formation: string;
        lineups: Player[];
    };
    timelines: MatchEvent[];
    h2h?: {
        vs: MatchHistory[];
    };
}