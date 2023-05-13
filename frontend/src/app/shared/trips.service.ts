import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { POI } from './data.service';
import { TripParamsDto } from './dto/tripparams.dto';
import { Trip } from './dto/trip.dto';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  apiUrl = environment.api;

  constructor(private http: HttpClient) { }

  getTrip(pois: POI[]): Observable<Trip>{
    let tripparamsDto = new TripParamsDto(this.getTripCoordinates(pois), 'foot', );
    return this.http.get<Trip>(`${this.apiUrl}/trips?coordinates=${tripparamsDto.coordinates}&mode=${tripparamsDto.mode}`);
  }

  getTripCoordinates(pois: POI[]){
    let coordinatesString = '';
    pois.forEach((poi) => {
      if(coordinatesString === ''){
        coordinatesString = `${poi.lon},${poi.lat},${poi._id}`
      } else {
        coordinatesString = `${coordinatesString};${poi.lon},${poi.lat},${poi._id}`
      }
    })
    console.log(coordinatesString)
    return coordinatesString;
  }
}
