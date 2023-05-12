interface Waypoints {
    hint: string;
    distance: number;
    name: string;
    location: Array<number>;
  }

interface Routes {
    geometry: Geometry;
    weight_name: string;
    weight: number;
    duration: number;
    distance: number;
  }

interface Geometry {
    coordinates: Array<Array<number>>;
    type: string;
  }


interface Route {
    routes: Array<Routes>;
    waypoints: Array<Waypoints>;
  }