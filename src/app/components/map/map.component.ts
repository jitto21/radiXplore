import { Component, OnInit } from '@angular/core';
import { MapServiceService } from 'src/app/services/map-service.service';
import  * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: any

  constructor(private mapService: MapServiceService) { }

  ngOnInit(): void {
    this.mapService.getMapData().subscribe((data: any) => {
      if(this.map) {
        this.map.remove();
      }
      console.log(data);
      const lat = +data.latitude;
      const long = +data.longitude;
      console.log("lat: ", lat, " ,long: ", long);
      this.map = L.map('map').setView([lat, long], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(this.map);
      if(lat && long) {
        var marker = L.marker([lat , long]).addTo(this.map);
      }

    })
  }

}
