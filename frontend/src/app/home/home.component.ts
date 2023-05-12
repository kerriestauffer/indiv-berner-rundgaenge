import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../shared/data.service';

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

  POIoptions = []; // POI of interest we get from the backend
  chosenPOIs = []; // array to store user chose POIs

  constructor(private dataService: DataService) {
    dataService.testRequest();
  }
}
