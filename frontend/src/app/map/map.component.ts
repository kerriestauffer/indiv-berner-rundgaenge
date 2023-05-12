import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  map: any;
  public ngAfterViewInit(): void {
    this.loadMap();
  }
  private loadMap(): void {
    this.map = L.map('map').setView([46.9441763932318, 7.44932287319358], 18);
    /*  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map); */
    var nexrad = L.tileLayer
      .wms('https://map.bern.ch/wms/OpenData/proxy.php?', {
        layers: 'Stadtplan_farbig',
        attribution: 'Weather data © 2012 IEM Nexrad',
      })
      .addTo(this.map);
  }
}
