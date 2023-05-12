import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environment';
import { RouteDto } from './dto/route.dto';

@Injectable()
export class RoutesService {
    base_url = environment.base_url;
    tripService = 'trip';
    osrm_trip_url = `${this.base_url}/${this.tripService}`


    constructor(private httpService: HttpService){}

    async getRoute(coordinates: any, mode: any) {
        console.log('params: ' + coordinates + ' mode ' + mode)
        console.log(`${this.osrm_trip_url}/v1/${mode}/${coordinates}?geometries=geojson`)
        const routes$ = this.httpService.get(`${this.osrm_trip_url}/v1/${mode}/${coordinates}?geometries=geojson`);
        
        return this.httpService.get(`${this.osrm_trip_url}/v1/${mode}/${coordinates}?geometries=geojson`).pipe(map((response)  => {
            let routeDto: RouteDto;
            routeDto = JSON.parse(response.data);
            console.log('routeDto ' + routeDto)
            return routeDto;
        }))
    }
}
