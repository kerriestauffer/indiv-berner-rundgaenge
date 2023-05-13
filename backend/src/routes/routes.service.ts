import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { environment } from 'src/environment';
import { Geometry, Route, RoutesDto, Waypoints } from './dto/route.dto';

@Injectable()
export class RoutesService {
    base_url = environment.base_url;
    tripService = 'trip';
    osrm_trip_url = `${this.base_url}/${this.tripService}`


    constructor(private httpService: HttpService){}

    async getTrip(coordinates: any, mode: any) {
        console.log('params: ' + coordinates + ' mode ' + mode)
        console.log(`${this.osrm_trip_url}/v1/${mode}/${coordinates}?geometries=geojson`)
        const routes$ = this.httpService.get(`${this.osrm_trip_url}/v1/${mode}/${coordinates}?geometries=geojson`);
        
        return this.httpService.get(`${this.osrm_trip_url}/v1/${mode}/${coordinates}?geometries=geojson`).pipe(map((response)  => {
            let geometry: Geometry = new Geometry(response.data.trips[0].geometry.coordinates, response.data.trips[0].geometry.type);
            let routes: RoutesDto = new RoutesDto(geometry, response.data.trips[0].weight_name, response.data.trips[0].weight, response.data.trips[0].duration, response.data.trips[0].distance)
            let waypoints: Waypoints = response.data.waypoints;
            let routeDto: Route = new Route([routes], [waypoints]);
            return routeDto;
        }))
    }
}
