export class Waypoint{
      hint: string;
      distance: number;
      name: string;
      location: Array<number>;
      _id: string;

      constructor(hint: string, distance: number, name: string, location: Array<number>, _id: string){
        this.hint = hint;
        this.distance = distance;
        this.name = name;
        this.location = location;
        this._id = _id;
      }
}