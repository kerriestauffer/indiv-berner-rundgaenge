import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { Observable } from 'rxjs';

export type POI = {
  _id?: string;
  Rubrik: string;
  Punktname: string;
  Beschrieb: string;
  Strasse: string;
  Hausnummer: string;
  PLZ: string;
  Ort: string;
  Quelle: string;
  Pfad_Foto: string; // is an URL
  lon: number;
  lat: number;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  testRequest(): Observable<POI[]> {
    const url = `${environment.api}/poi-data`;
    // console.log(`GET request to ${url}`);
    return this.http.get<POI[]>(url); /*.subscribe((res) => {
      console.log(res);
    });*/
  }

  getPOIbyId(id: string): Observable<POI> {
    const url = `${environment.api}/poi-data/${id}`;
    // console.log(`GET request to ${url}`);
    return this.http.get<POI>(url); /*.subscribe((res) => {
      console.log(res);
    });*/
  }
}
