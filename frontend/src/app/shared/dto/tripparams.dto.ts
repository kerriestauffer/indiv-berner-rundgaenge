export class TripParamsDto {
    coordinates: string;
    mode: string;

    constructor(coordinates: string, mode: string){
        this.coordinates = coordinates;
        this.mode = mode;
    }
}