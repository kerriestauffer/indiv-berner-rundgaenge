import { Component, Input } from '@angular/core';
import { DataService, POI } from '../shared/data.service';

@Component({
  selector: 'app-poi-infobox',
  templateUrl: './poi-infobox.component.html',
  styleUrls: ['./poi-infobox.component.scss'],
})
export class PoiInfoboxComponent {
  @Input() poiId = ''; // '645f501d63857bb556fb26b9';
  poi!: POI;

  constructor(private dataService: DataService) {
    dataService.getPOIbyId(this.poiId).subscribe((res) => {
      console.log(res);
      this.poi = res;
    });
  }
}
