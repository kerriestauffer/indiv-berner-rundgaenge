import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService, POI } from '../shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  mobilityOptionsForm = new FormGroup({
    foot_traffic: new FormControl(true),
    public_transport: new FormControl(false),
    publibike: new FormControl(false),
  });

 public POIoptions: POI[] = [];// POI of interest we get from the backend
  chosenPOIs = []; // array to store user chose POIs


  public constructor(private dataService: DataService) {
    dataService.testRequest().subscribe((res) => {
      this.POIoptions = res;
       console.log(res);
    });
  }
}



