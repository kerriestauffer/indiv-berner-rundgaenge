import { Component } from '@angular/core';

import * as L from 'leaflet';
L.Icon.Default.imagePath = 'assets/images/';

/* const iconRetinaUrl =
  'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const shadowUrl =
  'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault; */

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  map: any;
  data: any = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          coordinates: [
            [7.453911, 46.947457],
            [7.453837, 46.947705],
            [7.455398, 46.948154],
            [7.455922, 46.948559],
            [7.455839, 46.948667],
            [7.45957, 46.948385],
            [7.460092, 46.948184],
            [7.459678, 46.946363],
            [7.459288, 46.945959],
            [7.458232, 46.945389],
            [7.458124, 46.945078],
            [7.458592, 46.944691],
            [7.460973, 46.944523],
            [7.46084, 46.943687],
            [7.459641, 46.943077],
            [7.458608, 46.940852],
            [7.457725, 46.940447],
            [7.437349, 46.93967],
            [7.436109, 46.939798],
            [7.432955, 46.940855],
            [7.432329, 46.94096],
            [7.431509, 46.940571],
            [7.431151, 46.940649],
            [7.431129, 46.940516],
            [7.428828, 46.939414],
            [7.427998, 46.938603],
            [7.426096, 46.93945],
            [7.422664, 46.939924],
            [7.421956, 46.940192],
            [7.42131, 46.939407],
            [7.420433, 46.939647],
            [7.419639, 46.939869],
            [7.41976, 46.940077],
            [7.418381, 46.940449],
            [7.420759, 46.943701],
            [7.421633, 46.944495],
            [7.422519, 46.944602],
            [7.429793, 46.944671],
            [7.432547, 46.944304],
            [7.434419, 46.94732],
            [7.437714, 46.947227],
            [7.439953, 46.947666],
            [7.439962, 46.948303],
            [7.440731, 46.948567],
            [7.440513, 46.949385],
            [7.440658, 46.950938],
            [7.444498, 46.949691],
            [7.446047, 46.949432],
            [7.446156, 46.949739],
            [7.450068, 46.949159],
            [7.451178, 46.948895],
            [7.452824, 46.948993],
            [7.455106, 46.949315],
            [7.455632, 46.949222],
            [7.455839, 46.948667],
            [7.456632, 46.948857],
            [7.457168, 46.949344],
            [7.4577, 46.949336],
            [7.457923, 46.948708],
            [7.457564, 46.948081],
            [7.455105, 46.946682],
          ],
          type: 'LineString',
        },
      },
    ],
  };
  waypoints = [
    {
      waypoint_index: 0,
      trips_index: 0,
      hint: 'ZrQCgEXEWYYwAAAAAAAAABMAAAAAAAAAnZKgQQAAAABHGgFBAAAAADAAAAAAAAAAEwAAAAAAAAA2-gAA17xxAIFczAL4u3EAMFzMAgEAjwq_P9b_',
      distance: 19.22363768,
      name: 'Bubenbergrain',
      location: [7.453911, 46.947457],
    },
    {
      waypoint_index: 1,
      trips_index: 0,
      hint: '1FCwgN5QsIAbAAAAFwAAACgBAAAPAQAAbzbDQEDCokD6poNCdupwQg0AAAAMAAAAlAAAAIgAAAA2-gAAETpxAP89zAJQOnEAZz7MAgEATxK_P9b_',
      distance: 12.51774535,
      name: 'Dietlerstrasse',
      location: [7.420433, 46.939647],
    },
    {
      waypoint_index: 2,
      trips_index: 0,
      hint: 'km4EgHRNWIY4AAAADQAAAM8AAAAVAAAArxsXQhHDCEGI3glDwLZiQTgAAAANAAAAzwAAABUAAAA2-gAAgcFxAHpZzAIjwnEA4ljMAg8AXwO_P9b_',
      distance: 20.922894431,
      name: 'Schifflaube',
      location: [7.455105, 46.946682],
    },
  ];
  public ngAfterViewInit(): void {
    this.loadMap();
  }
  private loadMap(): void {
    this.map = L.map('map').setView([46.9441763932318, 7.44932287319358], 18);
    /* L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map); */
    L.tileLayer
      .wms('https://map.bern.ch/wms/OpenData/proxy.php?', {
        layers: 'Stadtplan_farbig',
        attribution: '© 2018 Geoinformation Stadt Bern',
      })
      .addTo(this.map);
    this.addRoute();
  }
  addRoute() {
    const geoJSON = L.geoJSON(this.data, {
      style: function (feature) {
        return { color: 'black' };
      },
    }).addTo(this.map);

    this.map.fitBounds(geoJSON.getBounds());
  }
}
