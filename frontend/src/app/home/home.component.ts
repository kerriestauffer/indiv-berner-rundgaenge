import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatCardModule} from '@angular/material/card'; 
import { POIdto } from './POIdto';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  mobilityOptionsForm = new FormGroup({
    foot_traffic: new FormControl(true),
    public_transport: new FormControl(false),
    publibike: new FormControl(false),
  });

 public POIoptions: POIdto[] = 
 [new POIdto("münster","Sehenswürdigkeit","Ein historisches Gebäude"),
 new POIdto("bundeshaus","Sehenswürdigkeit","Ein parlament Gebäude"),
 new POIdto("bundeshaus","Sehenswürdigkeit","Ein parlament Gebäude"),
 new POIdto("museum","Sehenswürdigkeit","Ein historisches Gebäude")] // POI of interest we get from the backend
  chosenPOIs = []; // array to store user chose POIs
   

  public constructor() {}

  public ngOnInit(): void {
    
  }

  
}



