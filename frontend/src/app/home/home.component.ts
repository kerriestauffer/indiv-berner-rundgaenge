import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService, POI } from '../shared/data.service';
import { TripService } from '../shared/trips.service';
import { Trip } from '../shared/dto/trip.dto';
import { Router } from '@angular/router';
import {map, Observable, startWith} from "rxjs";

export type CategorizedData = {
  name: string;
  data: POI[];
};

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
  myControl = new FormControl<string | POI>('');

  filteredPOIOptions: Observable<POI[]>;


  public POIoptions: POI[] = []; // POI of interest we get from the backend
  chosenPOIs: POI[] = []; // array to store user chose POIs
  search : String ="";

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
  searchText= '';

  trip: Trip | undefined;

  public constructor(private router: Router, private dataService: DataService, private tripService: TripService) {
    dataService.testRequest().subscribe((res) => {
      this.POIoptions = res;
      for (let category of this.categoriesWithData) {
        category.data = this.categorizeData(this.POIoptions, category.name);
      }
      console.log(this.categoriesWithData);
    });
  }

  getIndividualWalk() {
    let mode: string = '';
    if(this.mobilityOptionsForm.controls.foot_traffic.value === true){
      mode = 'foot';
    } else if (this.mobilityOptionsForm.controls.public_transport.value === true) {
      mode = 'car';
    } else if (this.mobilityOptionsForm.controls.publibike.value === true) {
      mode = 'bike';
    }
    this.router.navigate(['/map'], {state: { chosenPOIs: this.chosenPOIs, mode: mode}})
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

  isAtLeastTwoSelected(): boolean {
    return this.chosenPOIs.length >= 2;
  }

  ngOnInit(): void {
    this.filteredPOIOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.Punktname;
        return name ? this._filter(name) : this.POIoptions.slice();
      }),
    );
  }
  displayFn(poi: POI): string {
    return poi && poi.Punktname ? poi.Punktname : '';
  }

  private _filter(name: string): POI[] {
    const filterValue = name.toLowerCase();

    return this.POIoptions.filter(option => option.Punktname.toLowerCase().includes(filterValue));
  }

}
