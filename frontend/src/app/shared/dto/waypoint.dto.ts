export class Waypoint{
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