export interface Tournament {
    id: number;
    name: string;
    imageId?: string;
    gameId: number;
    platforms: string[];
    creatorId: number;
    participants: number[];
    approved: boolean;
    finished: boolean;
}