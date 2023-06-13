export interface User {
    id: number;
    nickname: string;
    platforms: string[];
    nationality: string;
    pictureId: string;
    profileId: number;
    created: number[];
    tournaments: number[];
    favourites: number[];
    wins: number;
    base64?: string;
}