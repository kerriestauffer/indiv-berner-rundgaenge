import { Component } from '@angular/core';

import * as L from 'leaflet';
import { TripService } from '../shared/trips.service';
import { DataService, POI } from '../shared/data.service';
import { Navigation, Router } from '@angular/router';
import { Trip } from '../shared/dto/trip.dto';
import { Waypoint } from '../shared/dto/waypoint.dto';
import { DataDto, FeatureDto, GeometryDto } from '../shared/dto/data.dto';
import { GeoJsonObject } from 'geojson';
L.Icon.Default.imagePath = 'assets/images/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  selectedPOIid: string = '';
  chosenPOIs: POI[] = [];
  trip: Trip | undefined;

  map: any;
  data: GeoJsonObject | undefined;

  waypoints: Waypoint[] = [];

  pointSelected = false;

  constructor(
    private tripService: TripService,
    private dataService: DataService,
    private router: Router
  ) {
    let nav: Navigation | null;
    nav = this.router.getCurrentNavigation();

    if (
      nav &&
      nav.extras &&
      nav.extras.state &&
      nav.extras.state['chosenPOIs']
    ) {
      this.chosenPOIs = nav.extras.state['chosenPOIs'] as POI[];
    }
  }

  public ngAfterViewInit(): void {
    this.getTrip();
    //this.loadMap();
  }

  private getTrip() {
    this.tripService.getTrip(this.chosenPOIs).subscribe((trip) => {
      this.trip = trip;
      this.waypoints = trip.waypoints;
      let geometryDto: GeometryDto = new GeometryDto(
        trip.routes[0].geometry.coordinates,
        'LineString'
      );
      let featureDto: FeatureDto = new FeatureDto(
        geometryDto,
        trip.routes[0].weight_name,
        trip.routes[0].weight,
        trip.routes[0].duration,
        trip.routes[0].distance
      );
      let dataDto: DataDto = new DataDto([featureDto]);
      this.loadMap(this.waypoints, dataDto);
    });
  }

  private loadMap(waypoints: Waypoint[], data: DataDto): void {
    this.map = L.map('map').setView([46.9441763932318, 7.44932287319358], 18);
    L.tileLayer
      .wms('https://map.bern.ch/wms/OpenData/proxy.php?', {
        layers: 'Stadtplan_farbig',
        attribution: '© 2018 Geoinformation Stadt Bern',
      })
      .addTo(this.map);
    this.addRoute(waypoints, data);
  }
  addRoute(waypoints: Waypoint[], data: DataDto) {
    const geoJSON = L.geoJSON(data, {
      style: function (feature) {
        return { color: 'black' };
      },
    }).addTo(this.map);
    this.map.fitBounds(geoJSON.getBounds());

    waypoints.forEach((waypoint) => {
      L.marker(new L.LatLng(waypoint.location[1], waypoint.location[0]))
        .bindPopup(waypoint.name)
        .addTo(this.map);
    });
  }

  getPOInameById(id: string): string {
    const poi = this.chosenPOIs.find((item) => item._id === id);
    return poi?.Punktname || 'name';
  }

  displayPOIinfo(id: any) {
    this.selectedPOIid = id;
    this.pointSelected = true;
  }
}
