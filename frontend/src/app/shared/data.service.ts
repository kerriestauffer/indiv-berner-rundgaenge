import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  testRequest() {
    const url = `${environment.api}/poi-data`;
    // console.log(`GET request to ${url}`);
    return this.http.get(url); /*.subscribe((res) => {
      console.log(res);
    });*/
  }
}
