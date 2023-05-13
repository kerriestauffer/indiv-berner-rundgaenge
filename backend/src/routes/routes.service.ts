import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { environment } from 'src/environment';
import { Geometry, Route, RoutesDto, Waypoint } from './dto/route.dto';

@Injectable()
export class RoutesService {
    base_url = environment.base_url;
    tripService = 'trip';
    osrm_trip_url = `${this.base_url}/${this.tripService}`
    idArray: string[] = [];

    constructor(private httpService: HttpService){}

    async getTrip(points: string, mode: any) {
        let point = points.split(';');
        let coordinates = '';
        let idArray: string[] = [];
        point.forEach((point) => {
            let pointComponents = point.split(',')
            if(coordinates === ''){
                coordinates = `${pointComponents[0]},${pointComponents[1]}`
            } else {
                coordinates = `${coordinates};${pointComponents[0]},${pointComponents[1]}`
            }
            idArray.push(pointComponents[2])
        })
        
        return this.httpService.get(`${this.osrm_trip_url}/v1/${mode}/${coordinates}?geometries=geojson`).pipe(map((response)  => {
            let geometry: Geometry = new Geometry(response.data.trips[0].geometry.coordinates, response.data.trips[0].geometry.type);
            let routes: RoutesDto = new RoutesDto(geometry, response.data.trips[0].weight_name, response.data.trips[0].weight, response.data.trips[0].duration, response.data.trips[0].distance)
            let waypoints: Waypoint[] = response.data.waypoints;
            waypoints.forEach((waypoint) => {
                waypoint._id = idArray.shift();
            })
            let routeDto: Route = new Route([routes], [waypoints]);
            return routeDto;
        }))
    }
}
