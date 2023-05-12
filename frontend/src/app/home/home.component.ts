import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService, POI } from '../shared/data.service';

export type CategorizedData = {
  name: string;
  data: POI[];
};

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

  public POIoptions: POI[] = []; // POI of interest we get from the backend
  chosenPOIs: POI[] = []; // array to store user chose POIs

  public categoriesWithData: CategorizedData[] = [
    { name: 'Kunst im öffentlichen Raum', data: [] },
    { name: 'Stadtverwaltung', data: [] },
    { name: 'Spielplatz', data: [] },
    { name: 'Kantonsverwaltung', data: [] },
    { name: 'Sehenswürdigkeiten', data: [] },
    { name: 'Café', data: [] },
    { name: 'Sport & Aktivitäten &#62; Aareschwimmen & Baden', data: [] },
    { name: 'Kunst & Kultur', data: [] },
  ];

  public constructor(private dataService: DataService) {
    dataService.testRequest().subscribe((res) => {
      this.POIoptions = res;
      //console.log(res);
      for (let category of this.categoriesWithData) {
        category.data = this.categorizeData(this.POIoptions, category.name);
      }
      console.log(this.categoriesWithData);
    });
  }

  private categorizeData(data: POI[], category: String): POI[] {
    return data.filter((poi) => poi.Rubrik === category);
  }

  togglePOISelection(poi: POI) {
    if (this.chosenPOIs.includes(poi)) {
      this.chosenPOIs = this.chosenPOIs.filter(
        (element) => element.Punktname !== poi.Punktname
      );
    } else {
      this.chosenPOIs.push(poi);
    }
  }

  isSelected(poi: POI): boolean {
    return this.chosenPOIs.includes(poi);
  }
}
