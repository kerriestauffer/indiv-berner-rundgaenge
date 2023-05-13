import { GeoJsonObject } from "geojson";

export class GeometryDto {
    coordinates: Array<Array<number>>;
    type: string;

    constructor(coordinates: Array<Array<number>>, type: string){
        this.coordinates = coordinates;
        this.type = type;
    }
}

export class FeatureDto {
    type: string;
    geometry: GeometryDto;
    weight_name: string;
    weight: number;
    duration: number;
    distance: number;

    constructor(geometry: GeometryDto, weight_name: string, weight: number, duration: number, distance: number){
        this.type = 'Feature';
        this.geometry = geometry;
        this.weight_name = weight_name;
        this.weight = weight;
        this.duration = duration;
        this.distance = distance;
    }
}

export class DataDto implements GeoJsonObject{
    type: "Feature" | "Point" | "MultiPoint" | "LineString" | "MultiLineString" | "Polygon" | "MultiPolygon" | "GeometryCollection" | "FeatureCollection"
    features: Array<FeatureDto>
    
    constructor(features: Array<FeatureDto>){
        this.type = 'FeatureCollection';
        this.features = features;
    }
}