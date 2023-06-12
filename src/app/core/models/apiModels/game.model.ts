export interface Game {
    id?: number;
    name?: string;
    year?: number;
    imageId?: string;
    platforms?: string[];
    tournaments?: number[];
    favourites?: number[];
    base64?: string;
}