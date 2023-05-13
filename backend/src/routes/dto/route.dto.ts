export class Waypoints {
    hint: string;
    distance: number;
    name: string;
    location: Array<number>;

    constructor(hint: string, distance: number, name: string, location: Array<number>){
        this.hint = hint;
        this.distance = distance;
        this.name = name;
        this.location = location;
    }
  }

export class RoutesDto {
    geometry: Geometry;
    weight_name: string;
    weight: number;
    duration: number;
    distance: number;

    constructor(geometry: Geometry, weight_name: string, weight: number, duration: number, distance: number){
        this.geometry = geometry;
        this.weight_name = weight_name;
        this.weight = weight;
        this.duration = duration;
        this.distance = distance;
    }
  }

export class Geometry {
    coordinates: Array<Array<number>>;
    type: string;

    constructor(coordinates: Array<Array<number>>, type: string){
        this.coordinates = coordinates;
        this.type = type;
    }
  }


export class Route {
    routes: Array<RoutesDto>;
    waypoints: Array<Waypoints>;

    constructor(routes: Array<RoutesDto>, waypoints: Array<Waypoints>){
        this.routes = routes;
        this.waypoints = waypoints;
    }
  }