import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environment';

@Injectable()
export class RoutesService {
    osrm_url = environment.osrm_url;

    constructor(private httpService: HttpService){}

    async getRoute(coordinates: any, mode: any) {
        console.log('params: ' + coordinates + ' mode ' + mode)
        console.log(`${this.osrm_url}/route/v1/${mode}/${coordinates}?geometries=geojson`)
        const routes$ = this.httpService.get(`${this.osrm_url}/route/v1/${mode}/${coordinates}?geometries=geojson`);
        
        return this.httpService.get(`${this.osrm_url}/route/v1/${mode}/${coordinates}?geometries=geojson`).pipe(map((response)  => {
            return response.data;
        }))
    }
}
