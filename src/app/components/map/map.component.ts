import { Component, OnInit } from '@angular/core';
import { MapServiceService } from 'src/app/services/map-service.service';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: any;
  locationData: any;
  provider = new OpenStreetMapProvider();



  constructor(private mapService: MapServiceService) { }

  ngOnInit(): void {
    this.mapService.getMapData().subscribe((data: any) => {
      this.locationData = data;
      if (this.map) {
        this.map.remove();
      }
      console.log(data);
      setTimeout(() => {
        if (this.locationData && this.locationData.latitude && this.locationData.longitude) {
          const lat = +this.locationData.latitude;
          const long = +this.locationData.longitude;
          console.log("lat: ", lat, " ,long: ", long);
          this.map = L.map('map').setView([lat, long], 13);
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
          }).addTo(this.map);
          const icon = L.icon({ iconUrl: '../../../assets/images/marker.png', iconSize: [20, 25] })
          const searchControl = GeoSearchControl({
            provider: this.provider,
            marker: {
              icon,
              draggable: false,
            },
          })
          searchControl.addTo(this.map)

          var marker = L.marker([lat, long], { icon }).addTo(this.map);
          marker.bindPopup(data.name + " " + data.description)
          marker.on('click', function (e) {
            marker.openPopup();
          });
          document.getElementById("map")?.scrollIntoView();
        }
      })
    })
  }

  getCoordinates(lat: string, long: string): string {
    let coordinates = '';
    if (+long >= 0 && +long <= 180) {
      coordinates += long + "\xB0 North and ";
    }
    else if (+long <= 0 && +long >= -180) {
      coordinates += long + "\xB0 South and ";
    }
    if (+lat >= 0 && +lat <= 90) {
      coordinates += lat + "\xB0 East";
    }
    else if (+lat <= 0 && +lat >= -90) {
      coordinates += lat + "\xB0 West";
    }
    return coordinates;
  }

  onClickGoTop() {
    document.getElementById("form")?.scrollIntoView();
  }

}
